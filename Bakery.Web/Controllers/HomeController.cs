using System.Web.Mvc;

namespace Bakery.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AppCache()
        {
            Response.ContentType = "text/cache-manifest";
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Cache.SetCacheability(System.Web.HttpCacheability.NoCache);
            return View();
        }
    }
}
