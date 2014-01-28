using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EQNWebsiteUI.Controllers
{
    public class UserPageController : Controller
    {
        //
        // GET: /UserPage/

        public ActionResult Index(string userName = "current")
        {
            // get from database user's page. current user relies on the currently logged in individual.
            return View();
        }

    }
}
