using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParseExcelToChapters
{
    public sealed class LoadedPage
    {
        public int PageNumber { get; private set; }
        public string CharacterName { get; private set; }
        public string PageDescription { get; private set; }
        public string CharacterImageUrl { get; private set; }
        public string BackgroundImageUrl { get; private set; }
        public string BackgroundAudioUrl { get; private set; }

        private Dictionary<string, int> options = new Dictionary<string, int>();

        public Dictionary<string, int> Options { get { return options; } }

        public LoadedPage(int pageNumber, string characterName, string pageDescription, string characterImage, string backgroundImage, string backgroundAudio)
        {
            PageNumber = pageNumber;
            CharacterName = characterName;
            PageDescription = pageDescription;
            CharacterImageUrl = characterImage;
            BackgroundImageUrl = backgroundImage;
            BackgroundAudioUrl = backgroundAudio;
        }

        public void AddOption(string optionText, int pageNumber)
        {
            options.Add(optionText, pageNumber);
        }

        public void ClearOptions()
        {
            options.Clear();
        }
    }
}
