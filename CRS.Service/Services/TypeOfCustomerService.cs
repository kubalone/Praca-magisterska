using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Services
{
    public class TypeOfCustomerService : Repository<TypeOfCustomer>, ITypeOfCustomerService
    {
        private readonly IMapper _mapper;

        public TypeOfCustomerService(CRSDbContext repositoryContext, IMapper mapper)
            :base(repositoryContext)
        {
            _mapper = mapper;
        }
        public async Task<IEnumerable<TypeOfCustomerDto>> GetTypesCustomer()
        {
            var typesOfCustomer = await GetAll().ToListAsync();
            var typeOfCustomerDto = _mapper.Map<List<TypeOfCustomerDto>>(typesOfCustomer);
            return typeOfCustomerDto;
        }
    }
}

