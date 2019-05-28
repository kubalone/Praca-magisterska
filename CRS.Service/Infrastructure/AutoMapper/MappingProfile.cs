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

        }
    }
}
