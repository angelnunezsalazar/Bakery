using System.Linq;

namespace Bakery.Web.Controllers
{
    using System.Web.Http.Data.EntityFramework;

    using Bakery.Web.Database;
    using Bakery.Web.Models;

    public class ProductsController : DbDataController<AppDbContext>
    {
        public IQueryable<Product> Get()
        {
            return DbContext.Products.AsQueryable();
        }

        public Product Get(int id)
        {
            return DbContext.Products.Find(1);
        }
    }
}
