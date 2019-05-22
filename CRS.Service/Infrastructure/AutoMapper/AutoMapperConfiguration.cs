using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.Infrastructure.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<UserProfile>();
            });
        }
    }
}
