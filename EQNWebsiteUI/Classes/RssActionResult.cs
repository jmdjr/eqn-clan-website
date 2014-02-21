using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ServiceModel.Syndication;
using System.Xml;
using Newtonsoft.Json;
using System.Runtime.Serialization.Json;
using System.IO;

namespace EQNWebsiteUI.Classes
{
    // http://www.wadewegner.com/2011/11/aggregating-rss-feeds-in-c-and-asp-net-mvc-3/
    public class RssActionResult : ActionResult
    {
        public SyndicationFeed Feed { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            JsonTextWriter jwriter = new JsonTextWriter(context.HttpContext.Response.Output);

                context.HttpContext.Response.ContentType = "application/rss+json";
            if (!ObjectCacheManager<string>.Instance.Contains("DefaultFeed"))
            {
                StringWriter sw = new StringWriter();
                XmlDocument doc = new XmlDocument();
                Rss20FeedFormatter rssFormatter = new Rss20FeedFormatter(Feed);
                using (XmlWriter writer = XmlWriter.Create(sw))
                {
                    rssFormatter.WriteTo(writer);
                }
                doc.LoadXml(sw.ToString());

                ObjectCacheManager<string>.Instance.Add("DefaultFeed", JsonConvert.SerializeXmlNode(doc));
            }

            jwriter.WriteRaw(ObjectCacheManager<string>.Instance["DefaultFeed"]);
        } 
    }
}