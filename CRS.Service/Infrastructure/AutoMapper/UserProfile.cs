using AutoMapper;
using CRS.Data.Entities;
using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CRS.Service.Infrastructure.AutoMapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(role => role.UserRoles.Select(roleName => roleName.Role.Name).FirstOrDefault()))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(user => user.Id))
                .ForMember(dto => dto.UserName, opt => opt.MapFrom(user => user.UserName));
        }
    }
}
