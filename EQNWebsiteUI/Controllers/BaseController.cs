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
        private T StreamXML<T>(string xmlUrl)
        {
            FileStream stream = new FileStream(Server.MapPath(xmlUrl), FileMode.Open);
            XmlReader reader = new XmlTextReader(stream);
            XmlSerializer serial = new XmlSerializer(typeof(T));
            T Model = default(T);

            try
            {
                if (serial.CanDeserialize(reader))
                {
                    Model = (T)serial.Deserialize(reader);
                }
            }
            catch (Exception)
            {

            }
            finally
            {
                reader.Close();
            }

            return Model;
        }

        public PartialViewResult MainMenu() 
        {

            if (User.Identity.IsAuthenticated)
            {
                ViewData["Menu"] = StreamXML<MenuModel>("/Content/Menus/RegisteredUserMenu.xml");
            }
            else
            {
                ViewData["Menu"] = StreamXML<MenuModel>("/Content/Menus/AnonymousUserMenu.xml");
            }
            return PartialView("_MainMenu");
        }

        public void GetWidgets()
        {
            ViewData["Widgets"] = StreamXML<WidgetsCollection>("/Content/Menus/DemoHomePageWidgetLayout.xml").widgets;
        }
    }
}
