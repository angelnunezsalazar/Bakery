using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Bakery.Web
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var config = GlobalConfiguration.Configuration;
            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings = settings;
        }
    }

    public class LowercaseContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            return propertyName.ToLower();
        }
    }
}