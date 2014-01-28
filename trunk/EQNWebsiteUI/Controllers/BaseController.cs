using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Serialization;
using EQNWebsiteUI.Models;

namespace EQNWebsiteUI.Controllers
{
    public class BaseController : Controller
    {
        public PartialViewResult MainMenu() {

            FileStream stream = new FileStream(Server.MapPath("/Content/Menus/MainMenu.xml"), FileMode.Open);
            XmlReader reader = new XmlTextReader(stream);
            XmlSerializer serial = new XmlSerializer(typeof(MenuModel));
            MenuModel menu = null;

            if(serial.CanDeserialize(reader))
            {
                menu = (MenuModel)serial.Deserialize(reader);
            }

            ViewData["Menu"] = menu;
            reader.Close();

            return PartialView("_MainMenu");
        }

        public void GetWidgets()
        {
            FileStream stream = new FileStream(Server.MapPath("/Content/Menus/DemoHomePageWidgetLayout.xml"), FileMode.Open);
            XmlReader reader = new XmlTextReader(stream);
            XmlSerializer serial = new XmlSerializer(typeof(WidgetsCollection));
            WidgetsCollection widgets = null;

            if (serial.CanDeserialize(reader))
            {
                widgets = (WidgetsCollection)serial.Deserialize(reader);
            }

            ViewData["Widgets"] = widgets.widgets;
            reader.Close();

        }
    }
}
