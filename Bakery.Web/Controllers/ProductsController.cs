using System.Linq;

namespace Bakery.Web.Controllers
{
    using System.Web.Http;

    using Bakery.Web.Database;
    using Bakery.Web.Models;

    public class ProductsController : ApiController
    {
        private readonly AppDbContext context;

        public ProductsController()
        {
            this.context = new AppDbContext();
        }

        public IQueryable<Product> Get()
        {
            return context.Products.AsQueryable();
        }

        public Product Get(int id)
        {
            return context.Products.Find(1);
        }
    }
}
