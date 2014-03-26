using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeOpenXml;
using ParseExcelToChapters.Model;

namespace ParseExcelToChapters
{
    public sealed class LoadedChapter
    {
        public string ChapterName { get; private set; }
        public int ChapterIndex { get; private set; }
        public string RequiresChapter { get; private set; }
        public int FirstPageIndex { get; private set; }
        private List<LoadedPage> pages = new List<LoadedPage>();
        public IList<LoadedPage> Pages { get { return pages.AsReadOnly(); } }
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
        public LoadedChapter(ExcelWorksheet sheet, int startingPageRow = 2)
        {
            this.FirstPageIndex = startingPageRow;
            RunThroughExcelSpreadsheet(sheet, startingPageRow);
        }

        private void RunThroughExcelSpreadsheet(ExcelWorksheet sheet, int startingPage)
        {
            this.ChapterName = sheet.Name;
            List<ExcelRangeBase> headerColumns = sheet.Cells.Where(i => i.Start.Row == 1).ToList();
            writePage(sheet, headerColumns, startingPage, startingPage);
        }
        
        private void writePage(ExcelWorksheet sheet, List<ExcelRangeBase> headers, int pageIndex, int startingPageIndex)
        {
            if (this.pages.Any(i => i.PageNumber == pageIndex))
            {
                // page already exists, no need to construct it. this prevents building loops.
                return;
            }

            string CharacterName = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "Char Name");
            string CharacterImage = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "Char Img");
            string BackgroundImage = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "BG Img");
            string BackgroundAudio = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "BG Audio");
            string PageText = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "Page Txt");
            string ops = ExelParserHelper.getTextFromColumn(sheet, headers, pageIndex, "Options");
            LoadedPage page = new LoadedPage(pageIndex, CharacterName, PageText, CharacterImage, BackgroundImage, BackgroundAudio);

            try
            {
                int opPageNumber = startingPageIndex;

                List<int> options = ops.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                                    .ToList()
                                    .ConvertAll<int>(i => int.Parse(i.Trim()));
                
                if (options.Count() == 1)
                {
                    opPageNumber = int.Parse(ops);
                    page.AddOption("Continue", opPageNumber);
                    writePage(sheet, headers, opPageNumber, startingPageIndex);
                }
                else if (options.Count() > 1)
                {
                    foreach (int op in options)
                    {
                        opPageNumber = op;

                        string label = ExelParserHelper.getTextFromColumn(sheet, headers, opPageNumber, "Page Txt");
                        string next = ExelParserHelper.getTextFromColumn(sheet, headers, opPageNumber, "Options");

                        if (next == null || next == "" || next.Contains(','))
                        {
                            throw new Exception(String.Format("FORMAT ISSUE: row {0}, of chapter \"{1}\": option page number not found, or too many pages exist. ", pageIndex, this.ChapterName));
                        }

                        opPageNumber = int.Parse(next);
                        page.AddOption(label, opPageNumber);
                        writePage(sheet, headers, opPageNumber, startingPageIndex);
                    }
                }
                else
                {
                    page.AddOption("End of Branch", startingPageIndex);
                }
            }
            catch (Exception e)
            {
                page.ClearOptions();
                page.AddOption("Page Parse Error", startingPageIndex);
                throw e;
            }

            this.pages.Add(page);
        }

        public override string ToString()
        {
            return this.ChapterName;
        }
    }
}
