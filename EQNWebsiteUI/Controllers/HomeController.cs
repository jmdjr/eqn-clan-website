using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EQNWebsiteUI.Controllers
{
    public class HomeController: BaseController
    {
        public ActionResult Index()
        {
            GetWidgets();
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}
