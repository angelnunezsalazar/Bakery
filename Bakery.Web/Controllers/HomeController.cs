﻿using System.Web.Mvc;

namespace Bakery.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
