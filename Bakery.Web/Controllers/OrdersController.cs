namespace Bakery.Web.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.Data.EntityFramework;

    using Bakery.Web.Database;
    using Bakery.Web.Models;

    public class OrdersController : DbDataController<AppDbContext>
    {
        [HttpPost]
        public void Post(Order order)
        {
            DbContext.Orders.Add(order);
            DbContext.SaveChanges();
        }
    }
}