using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using OfficeOpenXml;
using importChapters.Model;

namespace importChapters
{
    public partial class ImportWindow : Form
    {
        private List<string> LoadedFiles = new List<string>();
        private StoryBuildsContainer db = new StoryBuildsContainer();
        int currentRow = 2;
        ExcelPackage currentPackage = null;

        public ImportWindow()
        {
            InitializeComponent();
        }

        private void LoadExcelSpreadsheet() 
        {
            DialogResult results = OpenFile.ShowDialog();

            if (results == DialogResult.OK)
            {
                LoadedFiles.AddRange(OpenFile.FileNames);
            }

            string names = "";

            LoadedFiles.ForEach(i => names += ", " + i);

            if (names.Length > 2)
            {
                names = names.Remove(0, 2);
            }

            DisplayExcelFileName.Text = names;
        }

        private void ParseExcelSpreadsheets() 
        {
            RunThroughExcelSpreadsheet(LoadedFiles.FirstOrDefault());
        }

        #region Run Through Spreadsheet for Game
        private void RunThroughExcelSpreadsheet(string excelSpreadsheet)
        {
            try
            {
                FileInfo fi = new FileInfo(excelSpreadsheet);
                currentPackage = new ExcelPackage(fi);
                currentRow = 2;

                List<ExcelRangeBase> range = currentPackage.Workbook.Worksheets[2].Cells.Where(i => i.Start.Row == 1).ToList();
                Dictionary<string, int> lookup = new Dictionary<string, int>();

                
                

                writePage(currentPackage.Workbook.Worksheets[2], currentRow);
            }
            catch (Exception)
            {
            }
        }

        private bool writePage(ExcelWorksheet sheet, int RowIndex)
        {
            string characterName = "A";
            //string characterImage = "B";
            //string backgroundImage = "C";
            //string backgroundAudio = "D";
            string pageText = "E";
            string nextPage = "F";
            //string requiredPages = "G";

            string row = RowIndex.ToString();

            PageTextTextBox.Text = sheet.Cells[pageText + row].Text;
            CharacterNameTextBox.Text = sheet.Cells[characterName + row].Text;

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

            OptionsListBox.DataSource = options.ToList();

            return sheet.Cells[nextPage + RowIndex.ToString()].Text != "";
        }

        //private string establishColumns(ExcelWorksheet sheet, string columnName)
        //{
        //    string currentColumnName = sheet.Cells["A1"].Text;
        //    string columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            
        //    while(
        //}
        #endregion

        #region UI Events
        private void SelectExcelButton_Click(object sender, EventArgs e)
        {
            LoadExcelSpreadsheet();
        }
        
        private void DisplayExcelFileName_Click(object sender, EventArgs e)
        {
            LoadExcelSpreadsheet();
        }

        private void InterpretButton_Click(object sender, EventArgs e)
        {
            ParseExcelSpreadsheets();
        }

        private void TestPlayButton_Click(object sender, EventArgs e)
        {
            ParseExcelSpreadsheets();
        }

        private void SaveButton_Click(object sender, EventArgs e)
        {

        }
        
        private void LoadDatabaseButton_Click(object sender, EventArgs e)
        {

        }

        private void ChooseOptionButton_Click(object sender, EventArgs e)
        {
            var test = (KeyValuePair<string, int>)OptionsListBox.SelectedItem;

            writePage(currentPackage.Workbook.Worksheets[2], test.Value);
        }
        #endregion

    }
}
