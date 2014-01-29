using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace EQNWebsiteUI.Models
{
    [XmlRoot("widgetCollection")]
    public class WidgetsCollection
    {
        [XmlArray("widgets")]
        [XmlArrayItem("widget")]
        public WidgetModel[] widgets;
    }

    [XmlRoot("widget")]
    public class WidgetModel
    {
        [XmlAttribute("positionX")]
        public int positionX;
        
        [XmlAttribute("positionY")]
        public int positionY;

        [XmlAttribute("sizeX")]
        public int sizeX;

        [XmlAttribute("sizeY")]
        public int sizeY;

        [XmlAttribute("type")]
        public string widgetType;
    }
}