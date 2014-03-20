namespace importChapters
{
    partial class ImportWindow
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.OpenFile = new System.Windows.Forms.OpenFileDialog();
            this.SelectButton = new System.Windows.Forms.Button();
            this.DisplayExcelFileName = new System.Windows.Forms.TextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.CharacterNameTextBox = new System.Windows.Forms.TextBox();
            this.PageTextTextBox = new System.Windows.Forms.TextBox();
            this.OptionsListBox = new System.Windows.Forms.ListBox();
            this.SaveButton = new System.Windows.Forms.Button();
            this.TestPlayButton = new System.Windows.Forms.Button();
            this.ToolTipsDisplay = new System.Windows.Forms.ToolTip(this.components);
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.LoadDatabaseButton = new System.Windows.Forms.Button();
            this.ChapterListBox = new System.Windows.Forms.ListBox();
            this.StoryListBox = new System.Windows.Forms.ListBox();
            this.ChooseOptionButton = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // OpenFile
            // 
            this.OpenFile.FileName = "ZC.xlsx";
            this.OpenFile.Filter = "Excel Files|*.xlsx|All Files|*.*";
            this.OpenFile.InitialDirectory = "C:\\";
            this.OpenFile.Multiselect = true;
            // 
            // SelectButton
            // 
            this.SelectButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.SelectButton.Location = new System.Drawing.Point(430, 12);
            this.SelectButton.Name = "SelectButton";
            this.SelectButton.Size = new System.Drawing.Size(82, 23);
            this.SelectButton.TabIndex = 0;
            this.SelectButton.Text = "Select";
            this.ToolTipsDisplay.SetToolTip(this.SelectButton, "Click to select Excel File");
            this.SelectButton.UseVisualStyleBackColor = true;
            this.SelectButton.Click += new System.EventHandler(this.SelectExcelButton_Click);
            // 
            // DisplayExcelFileName
            // 
            this.DisplayExcelFileName.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.DisplayExcelFileName.Location = new System.Drawing.Point(12, 12);
            this.DisplayExcelFileName.Name = "DisplayExcelFileName";
            this.DisplayExcelFileName.ReadOnly = true;
            this.DisplayExcelFileName.Size = new System.Drawing.Size(412, 20);
            this.DisplayExcelFileName.TabIndex = 1;
            this.ToolTipsDisplay.SetToolTip(this.DisplayExcelFileName, "Click to select Excel File");
            this.DisplayExcelFileName.Click += new System.EventHandler(this.DisplayExcelFileName_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBox1.Controls.Add(this.ChooseOptionButton);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.CharacterNameTextBox);
            this.groupBox1.Controls.Add(this.PageTextTextBox);
            this.groupBox1.Controls.Add(this.OptionsListBox);
            this.groupBox1.Location = new System.Drawing.Point(12, 196);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(506, 158);
            this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(6, 50);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(49, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Dialogue";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(84, 13);
            this.label1.TabIndex = 3;
            this.label1.Text = "Character Name";
            // 
            // CharacterNameTextBox
            // 
            this.CharacterNameTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.CharacterNameTextBox.Location = new System.Drawing.Point(96, 19);
            this.CharacterNameTextBox.Name = "CharacterNameTextBox";
            this.CharacterNameTextBox.Size = new System.Drawing.Size(278, 20);
            this.CharacterNameTextBox.TabIndex = 2;
            // 
            // PageTextTextBox
            // 
            this.PageTextTextBox.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.PageTextTextBox.Location = new System.Drawing.Point(6, 66);
            this.PageTextTextBox.Multiline = true;
            this.PageTextTextBox.Name = "PageTextTextBox";
            this.PageTextTextBox.Size = new System.Drawing.Size(368, 86);
            this.PageTextTextBox.TabIndex = 1;
            // 
            // OptionsListBox
            // 
            this.OptionsListBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.OptionsListBox.FormattingEnabled = true;
            this.OptionsListBox.Location = new System.Drawing.Point(380, 18);
            this.OptionsListBox.Name = "OptionsListBox";
            this.OptionsListBox.Size = new System.Drawing.Size(120, 108);
            this.OptionsListBox.TabIndex = 0;
            // 
            // SaveButton
            // 
            this.SaveButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.SaveButton.Location = new System.Drawing.Point(430, 365);
            this.SaveButton.Name = "SaveButton";
            this.SaveButton.Size = new System.Drawing.Size(82, 30);
            this.SaveButton.TabIndex = 1;
            this.SaveButton.Text = "Save";
            this.ToolTipsDisplay.SetToolTip(this.SaveButton, "Save Parsed Data");
            this.SaveButton.UseVisualStyleBackColor = true;
            this.SaveButton.Click += new System.EventHandler(this.SaveButton_Click);
            // 
            // TestPlayButton
            // 
            this.TestPlayButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.TestPlayButton.Location = new System.Drawing.Point(418, 19);
            this.TestPlayButton.Name = "TestPlayButton";
            this.TestPlayButton.Size = new System.Drawing.Size(82, 30);
            this.TestPlayButton.TabIndex = 3;
            this.TestPlayButton.Text = "Test Play";
            this.ToolTipsDisplay.SetToolTip(this.TestPlayButton, "Run through Chapter");
            this.TestPlayButton.UseVisualStyleBackColor = true;
            this.TestPlayButton.Click += new System.EventHandler(this.TestPlayButton_Click);
            // 
            // groupBox2
            // 
            this.groupBox2.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBox2.Controls.Add(this.LoadDatabaseButton);
            this.groupBox2.Controls.Add(this.ChapterListBox);
            this.groupBox2.Controls.Add(this.TestPlayButton);
            this.groupBox2.Controls.Add(this.StoryListBox);
            this.groupBox2.Location = new System.Drawing.Point(12, 41);
            this.groupBox2.MinimumSize = new System.Drawing.Size(348, 149);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(506, 149);
            this.groupBox2.TabIndex = 4;
            this.groupBox2.TabStop = false;
            // 
            // LoadDatabaseButton
            // 
            this.LoadDatabaseButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.LoadDatabaseButton.Location = new System.Drawing.Point(418, 96);
            this.LoadDatabaseButton.Name = "LoadDatabaseButton";
            this.LoadDatabaseButton.Size = new System.Drawing.Size(82, 47);
            this.LoadDatabaseButton.TabIndex = 4;
            this.LoadDatabaseButton.Text = "Load From DB";
            this.LoadDatabaseButton.UseVisualStyleBackColor = true;
            this.LoadDatabaseButton.Click += new System.EventHandler(this.LoadDatabaseButton_Click);
            // 
            // ChapterListBox
            // 
            this.ChapterListBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.ChapterListBox.FormattingEnabled = true;
            this.ChapterListBox.Location = new System.Drawing.Point(212, 19);
            this.ChapterListBox.Name = "ChapterListBox";
            this.ChapterListBox.Size = new System.Drawing.Size(198, 121);
            this.ChapterListBox.TabIndex = 0;
            // 
            // StoryListBox
            // 
            this.StoryListBox.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left)));
            this.StoryListBox.FormattingEnabled = true;
            this.StoryListBox.Location = new System.Drawing.Point(6, 19);
            this.StoryListBox.Name = "StoryListBox";
            this.StoryListBox.Size = new System.Drawing.Size(200, 121);
            this.StoryListBox.TabIndex = 0;
            // 
            // ChooseOptionButton
            // 
            this.ChooseOptionButton.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.ChooseOptionButton.Location = new System.Drawing.Point(380, 129);
            this.ChooseOptionButton.Name = "ChooseOptionButton";
            this.ChooseOptionButton.Size = new System.Drawing.Size(120, 23);
            this.ChooseOptionButton.TabIndex = 5;
            this.ChooseOptionButton.Text = "Choose";
            this.ChooseOptionButton.UseVisualStyleBackColor = true;
            this.ChooseOptionButton.Click += new System.EventHandler(this.ChooseOptionButton_Click);
            // 
            // ImportWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(530, 407);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.SaveButton);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.DisplayExcelFileName);
            this.Controls.Add(this.SelectButton);
            this.MinimumSize = new System.Drawing.Size(546, 445);
            this.Name = "ImportWindow";
            this.Text = "Import Chapters";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.OpenFileDialog OpenFile;
        private System.Windows.Forms.Button SelectButton;
        private System.Windows.Forms.TextBox DisplayExcelFileName;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.ListBox OptionsListBox;
        private System.Windows.Forms.Button SaveButton;
        private System.Windows.Forms.TextBox PageTextTextBox;
        private System.Windows.Forms.Button TestPlayButton;
        private System.Windows.Forms.ToolTip ToolTipsDisplay;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button LoadDatabaseButton;
        private System.Windows.Forms.ListBox ChapterListBox;
        private System.Windows.Forms.ListBox StoryListBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox CharacterNameTextBox;
        private System.Windows.Forms.Button ChooseOptionButton;
    }
}

