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
        FileInfo loadedFile = null;
        //string jsonCache = "";
        ExcelPackage currentPackage = null;

        private List<LoadedPage> pages = new List<LoadedPage>();

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


        private void RunThroughExcelSpreadsheet()
        {
            try
            {
                currentPackage = new ExcelPackage(loadedFile);
                writePage(currentPackage.Workbook.Worksheets[2], 2);
            }
            catch (Exception)
            {
            }
        }

        private bool writePage(ExcelWorksheet sheet, int RowIndex)
        {
            //string characterName = "A";
            //string characterImage = "B";
            //string backgroundImage = "C";
            //string backgroundAudio = "D";
            string pageText = "E";
            string nextPage = "F";
            //string requiredPages = "G";

            string row = RowIndex.ToString();

            //PageTextTextBox.Text = sheet.Cells[pageText + row].Text;
            //CharacterNameTextBox.Text = sheet.Cells[characterName + row].Text;

            string ops = sheet.Cells[nextPage + row].Text;
            Dictionary<string, int> options = new Dictionary<string, int>();

            try
            {
                if (ops != null && ops != "" && !ops.Contains(","))
                {
                    options.Add("Continue", int.Parse(ops));
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

        //private string establishColumns(ExcelWorksheet sheet, string columnName)
        //{
        //    string currentColumnName = sheet.Cells["A1"].Text;
        //    string columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        //    while(
        //}

        public class LoadedPage
        {
            public int PageNumber { get; private set;}
            public string PageTitle { get; private set; }
            public string PageDescription { get; private set; }

            private Dictionary<string, int> options = new Dictionary<string, int>();

            public IDictionary<string, int> Options { get { return options; } }
            
            protected LoadedPage(int pageNumber, string pageTitle, string pageDescription)
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
