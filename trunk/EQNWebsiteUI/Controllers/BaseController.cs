using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Serialization;
using EQNWebsiteUI.Models;
using EQNWebsiteUI.Classes;

namespace EQNWebsiteUI.Controllers
{
    public class BaseController : Controller
    {
        private object xmlLock = new object();

        private T StreamXML<T>(string xmlUrl)
        {
            T Model = default(T);

            lock (xmlLock)
            {
                XmlReader reader = null;
                try
                {
                    using (FileStream stream = new FileStream(Server.MapPath(xmlUrl), FileMode.Open))
                    {
                        reader = new XmlTextReader(stream);
                        XmlSerializer serial = new XmlSerializer(typeof(T));

                        if (serial.CanDeserialize(reader))
                        {
                            Model = (T)serial.Deserialize(reader);
                        }
                    }
                }
                catch (Exception)
                {

                }
                finally
                {
                    if (reader != null)
                    {
                        reader.Close();
                    }
                }
            }

            return Model;
        }

        public PartialViewResult MainMenu() 
        {
            // update cache if cache has expired/non-existing items
            if (!ObjectCacheManager<MenuModel>.Instance.Contains("RegisteredMenu"))
            {
                ObjectCacheManager<MenuModel>.Instance.Add("RegisteredMenu", StreamXML<MenuModel>("/Content/Menus/RegisteredUserMenu.xml"));
            }
            if (!ObjectCacheManager<MenuModel>.Instance.Contains("AnonymousMenu"))
            {
                ObjectCacheManager<MenuModel>.Instance.Add("AnonymousMenu", StreamXML<MenuModel>("/Content/Menus/AnonymousUserMenu.xml"));
            }

            if (User.Identity.IsAuthenticated)
            {
                ViewData["Menu"] = ObjectCacheManager<MenuModel>.Instance["RegisteredMenu"];
            }
            else
            {
                ViewData["Menu"] = ObjectCacheManager<MenuModel>.Instance["AnonymousMenu"];
            }

            return PartialView("_MainMenu");
        }

        public void GetDemoWidgets()
        {
            // update cache if cache has expired/non-existing items
            if (!ObjectCacheManager<WidgetsCollection>.Instance.Contains("Widgets"))
            {
                ObjectCacheManager<WidgetsCollection>.Instance.Add("Widgets", StreamXML<WidgetsCollection>("/Content/Menus/DemoHomePageWidgetLayout.xml"));
            }
            
            WidgetsCollection collection = ObjectCacheManager<WidgetsCollection>.Instance["Widgets"];

            if (collection != null)
            {
                ViewData["Widgets"] = collection.widgets;
            }
            else
            {
                ViewData["Widgets"] = null;
            }
        }

        public 
    }
}
