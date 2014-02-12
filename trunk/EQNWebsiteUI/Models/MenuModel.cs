﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;

namespace EQNWebsiteUI.Models
{
    [XmlRoot("menu")]
    public class MenuModel
    {
        [XmlArray("items")]
        [XmlArrayItem("item")]
        public ItemModel[] items;
    }

    [XmlRoot("item")]
    public class ItemModel
    {
        [XmlAttribute("text")]
        public string text;

        [XmlAttribute("href")]
        public string href;

        [XmlArray("items")]
        [XmlArrayItem("item")]
        public ItemModel[] items;
    }
}