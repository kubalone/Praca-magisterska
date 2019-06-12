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
    public class BrandService :  Repository<Brand>, IBrandService
    {
        private readonly IMapper _mapper;
        public BrandService(CRSDbContext repositoryContext, IMapper mapper)
            : base(repositoryContext)
        {
            _mapper = mapper;
        }
        
    
        public async Task<IEnumerable<BrandDto>> GetAllBrands()
        {
            var brands = await  GetAll().ToListAsync();
            var brandsDto = _mapper.Map<List<BrandDto>>(brands);
            return brandsDto;

        }
    }
}
