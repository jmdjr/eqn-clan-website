using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EQNWebsiteUI.Controllers
{
    public class UserPageController : BaseController
    {
        //
        // GET: /UserPage/

        public ActionResult Index(string userName = "current")
        {
            // get from database user's page. current user relies on the currently logged in individual.
            // if the user is not logged in, present an alternate page stating something like they should register to take advantage of
            //   the customizeable user page, when those are done.

            GetDemoWidgets();
            return View();
        }

    }
}
