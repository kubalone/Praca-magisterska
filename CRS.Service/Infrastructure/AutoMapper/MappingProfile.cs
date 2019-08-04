using AutoMapper;
using CRS.Data.Entities;
using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CRS.Service.Infrastructure.AutoMapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            //dane użytkowników
            CreateMap<ApplicationUser, UserDto>()
               .ForMember(dest => dest.Role, opt => opt.MapFrom(role => role.UserRoles.Select(roleName => roleName.Role.Name).FirstOrDefault()));
            //Typ klienta
            CreateMap<TypeOfCustomer, TypeOfCustomerDto>();
            //klient
            CreateMap<Customer, CustomerDto>();
            CreateMap<CustomerDto, Customer>();
            //pojazdy
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<VehicleDto, Vehicle>();
            //Brand
            CreateMap<Brand, BrandDto>();
            CreateMap<BrandDto, Brand>();
            //VehicleModel
            CreateMap<VehicleModel, VehicleModelDto>();
            CreateMap<VehicleModelDto, VehicleModel>();

            CreateMap<Order, OrderDto>();
            CreateMap<OrderDto, Order>();

            CreateMap<Order, OrderDetailsDto>()
                .ForMember(dest => dest.Customer, opt => opt.MapFrom(src => src.Customer));
                //.ForPath(d=>d.Customer.Vehicles, opt=>opt.Ignore())
                //.ForPath(dest=>dest.Customer.Orders, opt=>opt.Ignore());
                
            //CreateMap<OrderDetailsDto, Order>();



        }
    }
}
