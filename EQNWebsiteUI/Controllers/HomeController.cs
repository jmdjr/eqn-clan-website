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
            return View();
        }

        public ActionResult Home() {
            return PartialView();
        }

        public ActionResult AboutUs()
        {
            return PartialView();
        }

        public ActionResult CodeOfConduct()
        {
            return PartialView();
        }
        public ActionResult Heirarchy()
        {
            return PartialView();
        }
        public ActionResult Roster()
        {
            return PartialView();
        }

        public ActionResult Charter()
        {
            return PartialView();
        }

        public ActionResult Wiki()
        {
            return PartialView();
        }

        public ActionResult GuildArchives()
        {
            return PartialView();
        }

        public ActionResult Events()
        {
            return PartialView();
        }

        public ActionResult Crafters()
        {
            return PartialView();
        }

        public ActionResult Gallery()
        {
            return PartialView();
        }

        public ActionResult ContactUs()
        {
            return PartialView();
        }
    }
}
