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
using ParseExcelToChapters;

namespace importChapters
{
    public partial class ImportWindow : Form
    {
        private List<string> LoadedFiles = new List<string>();
        LoadedStory selectedStory = null;
        LoadedChapter selectedChapter = null;

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
            
            if(names != null && names != "")
            {
                FileInfo fi = new FileInfo(LoadedFiles.FirstOrDefault());
                selectedStory = new LoadedStory(fi);

                ListBoxStories.Items.Clear();
                ListBoxStories.Items.Add(selectedStory.StoryName);
            }
        }

        #region Run Through Spreadsheet for Game
        private void RunThroughExcelSpreadsheet()
        {
            writePage(selectedChapter, selectedChapter.FirstPageIndex);
        }

        private void writePage(LoadedChapter chapter, int RowIndex)
        {
            LoadedPage page = chapter[RowIndex];

            if(page != null)
            {
                TextBoxCharacterName.Text = page.CharacterName;
                TextBoxDialogue.Text = page.PageDescription;
                ListBoxOptions.DataSource = page.Options.ToList();
            }
        }

        private void JumpToPageSelected()
        {
            if (ListBoxOptions.SelectedItem != null)
            {
                KeyValuePair<string, int> selection = (KeyValuePair<string, int>)ListBoxOptions.SelectedItem;
                writePage(selectedChapter, selection.Value);
            }
        }
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

        private void TestPlayButton_Click(object sender, EventArgs e)
        {
            RunThroughExcelSpreadsheet();
        }

        private void SaveButton_Click(object sender, EventArgs e)
        {
            DialogResult results = MessageBox.Show("Confirm you actually want to save this to the database", "Are You Sure?", MessageBoxButtons.OKCancel);

            if (results == System.Windows.Forms.DialogResult.OK)
            {
                selectedStory.SaveToDatabase();
            }
        }
        
        private void LoadDatabaseButton_Click(object sender, EventArgs e)
        {

        }

        private void ChooseOptionButton_Click(object sender, EventArgs e)
        {
            JumpToPageSelected();
        }

        private void ImportWindow_Load(object sender, EventArgs e)
        {

        }

        #endregion

        private void ListBoxStories_SelectedIndexChanged(object sender, EventArgs e)
        {
            ListBoxChapters.Items.Clear();
            TestPlayButton.Enabled = false;
            if (selectedStory != null)
            {
                ListBoxChapters.Items.AddRange(selectedStory.Chapters.ToArray());
            }
        }

        private void ListBoxChapters_SelectedIndexChanged(object sender, EventArgs e)
        {
            selectedChapter = (LoadedChapter)ListBoxChapters.SelectedItem;
            TestPlayButton.Enabled = false;

            if (selectedChapter != null)
            {
                TestPlayButton.Enabled = true;
            }
        }
    }
}
