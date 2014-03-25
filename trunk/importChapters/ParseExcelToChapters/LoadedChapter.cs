using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;

namespace ParseExcelToChapters
{
    public class LoadedChapter
    {
        ExcelPackage currentPackage = null;

        private List<LoadedPage> pages = new List<LoadedPage>();
        List<ExcelRangeBase> headerColumns = null;
        /// <summary>
        /// returns the LoadedPage in this loaded chapter.
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public LoadedPage this[int pageIndex]
        {
            get
            {
                if (!pages.Any(i => i.PageNumber == pageIndex))
                {
                    throw new Exception("!LoadedPage:[] page of pageIndex was not found!");
                }

                return pages.FirstOrDefault(i => i.PageNumber == pageIndex);
            }
        }

        public LoadedChapter(FileInfo excelFile)
        {
            RunThroughExcelSpreadsheet(excelFile);
        }

        private void RunThroughExcelSpreadsheet(FileInfo excelFile)
        {
            try
            {
                currentPackage = new ExcelPackage(excelFile);

                List<ExcelRangeBase> headerColumns = currentPackage.Workbook.Worksheets[2].Cells.Where(i => i.Start.Row == 1).ToList();

                writePage(currentPackage.Workbook.Worksheets[2], headerColumns, 2);
            }
            catch (Exception)
            {
            }
        }

        private string getTextFromColumn(ExcelWorksheet sheet, List<ExcelRangeBase> headers, int pageIndex, string columnName)
        {
            ExcelRangeBase head = headers.FirstOrDefault(i => i.Text == columnName);
            if (head != null)
            {
                int column = head.Start.Column;
                return sheet.Cells[pageIndex, column].Text;
            }
            return null;
        }

        private void writePage(ExcelWorksheet sheet, List<ExcelRangeBase> headers, int pageIndex)
        {
            // page already exists
            if (this.pages.Any(i => i.PageNumber == pageIndex))
            {
                return;
            }

            string CharacterName = getTextFromColumn(sheet, headers, pageIndex, "Character Name");
            string PageText = getTextFromColumn(sheet, headers, pageIndex, "Txt");
            LoadedPage page = new LoadedPage(pageIndex, CharacterName, PageText);

            string ops = getTextFromColumn(sheet, headers, pageIndex, "NxtPg");
            Dictionary<string, int> options = new Dictionary<string, int>();

            try
            {
                if (ops != null && ops != "" && !ops.Contains(","))
                {
                    page.AddOption("Continue", int.Parse(ops));
                }
                else if (ops != null && ops != "" && ops.Contains(","))
                {
                    string[] newOps = ops.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

                    foreach (string op in newOps)
                    {
                        string nop = op.Trim();
                        string label = sheet.Cells[pageText + nop].Text;
                        string next = sheet.Cells[nextPage + nop].Text;

                        if (next == null || next == "" || next.Contains(','))
                        {
                            throw new Exception();
                        }

                        options.Add(label, int.Parse(next));
                    }
                }
                else
                {
                    options.Add("End of Branch", 2);
                }
            }
            catch (Exception)
            {
                options.Clear();
                options.Add("Error: restarting", 2);
            }

            //OptionsListBox.DataSource = options.ToList();

            return sheet.Cells[nextPage + RowIndex.ToString()].Text != "";
        }

        public class LoadedPage
        {
            public int PageNumber { get; private set;}
            public string PageTitle { get; private set; }
            public string PageDescription { get; private set; }

            private Dictionary<string, int> options = new Dictionary<string, int>();

            public IDictionary<string, int> Options { get { return options; } }
            
            public LoadedPage(int pageNumber, string pageTitle, string pageDescription)
            {
                PageNumber = pageNumber;
                PageTitle = pageTitle;
                PageDescription = pageDescription;
            }

            public void AddOption(string optionText, int pageNumber)
            {
                options.Add(optionText, pageNumber);
            }
        }
    }
}
