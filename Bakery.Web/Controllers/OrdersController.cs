namespace Bakery.Web.Controllers
{
    using System.Web.Http;

    using Bakery.Web.Database;
    using Bakery.Web.Models;

    public class OrdersController : ApiController
    {
        private readonly AppDbContext context;

        public OrdersController()
        {
            this.context = new AppDbContext();
        }

        [HttpPost]
        public void Post(Order order)
        {
            context.Orders.Add(order);
            context.SaveChanges();
        }
    }
}
