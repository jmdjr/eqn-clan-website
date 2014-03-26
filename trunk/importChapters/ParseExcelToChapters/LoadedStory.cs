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
    public sealed class LoadedStory
    {
        public string StoryName { get; private set; }

        private List<LoadedChapter> chapters { get; set; }
        public IList<LoadedChapter> Chapters { get { return chapters.AsReadOnly(); } }

        public LoadedStory(FileInfo excelFile, int firstPageIndex = 2)
        {
            chapters = new List<LoadedChapter>();

            using (ExcelPackage currentPackage = new ExcelPackage(excelFile))
            {
                this.StoryName = currentPackage.Workbook.Properties.Title;
                ExcelWorksheets worksheets = currentPackage.Workbook.Worksheets;

                int chapter = 1;
                while (chapter <= worksheets.Count())
                {
                    chapters.Add(new LoadedChapter(worksheets[chapter], firstPageIndex));
                    ++chapter;
                }
            }
        }

        public override string ToString()
        {
            return this.StoryName;
        }

        public void SaveToDatabase()
        {
            using (StoryBuildsEntities db = new StoryBuildsEntities())
            {

                Story story = db.Stories.Create();
                story.Price = 0;
                story.StoryName = this.StoryName;
                story = db.Stories.Add(story);
                db.SaveChanges();

                //foreach (LoadedChapter chapter in this.chapters)
                //{

                //    foreach (LoadedPage page in chapter.Pages)
                //    {
                //    }
                //}
            }
        }
        private int PageDatabaseSavingHelper() { return 0; }
    }
}
