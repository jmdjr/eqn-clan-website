using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EQNWebsiteUI.Models;

namespace EQNWebsiteUI.Classes
{
    public static class HtmlHelpers
    {
        public static string RenderMenuItems(this HtmlHelper helper, ItemModel i)
        {
            string menuItems = "";
            menuItems += "<li";
            string moreItems = "";

            if (i.items == null || i.items.Count() == 0)
            {
                menuItems += " class='menuitem'>";
            }
            else
            {
                menuItems += " class='menuitem-group'>";
                foreach (ItemModel item in i.items)
                {
                    moreItems += "<ul>" + helper.RenderMenuItems(item) + "</ul>";
                }
            }

            if (i.href != null && i.href != "")
            {
                menuItems += "<a href='" + i.href + "'>" + i.text + "</a>";
            }
            else
            {
                menuItems += i.text;
            }

            menuItems += moreItems + "</li>";

            return menuItems;
        }
    }
}