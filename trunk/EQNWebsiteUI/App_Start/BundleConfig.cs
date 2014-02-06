using System.Web;
using System.Web.Optimization;

namespace EQNWebsiteUI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.custom.js",
                        "~/Scripts/jquery-ui-menubar.js",
                        "~/Scripts/jquery.gridster.js",
                        "~/Scripts/jquery-magnificent-popup.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquery-custom").Include(
                        "~/Scripts/jQuery-Custom/UsefulExtensions.js",
                        "~/Scripts/jQuery-Custom/OriginalSmokeyEffect.js",
                        "~/Scripts/jQuery-Custom/initialize.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/themes/base/jquery-ui-1.10.4.custom.css",
                "~/Content/magnificent-popup.css",
                "~/Content/site.css"));
        }
    }
}