using AutoMapper;
using CRS.Service.Infrastructure.AutoMapper;
using CRS.Service.Interfaces;
using CRS.Service.Services;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace CRS.Web.NET.Framework
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            container.RegisterType<IVehicleService, VehicleService>();
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            container.RegisterInstance<IMapper>(mappingConfig.CreateMapper());


            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}