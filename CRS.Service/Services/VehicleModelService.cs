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
    public class VehicleModelService : Repository<VehicleModel>, IVehicleModelService
    {
        private readonly IMapper _mapper;
        public VehicleModelService(CRSDbContext repositoryContext, IMapper mapper)
            : base(repositoryContext)
        {
            _mapper = mapper;
        }
    
        public async Task<IEnumerable<VehicleModelDto>> GetConcreteModels(int id)
        {
            var vehicleModels = await FindByCondition(p => p.BrandId.Equals(id)).ToListAsync();
            var vehicleModelsDto = _mapper.Map<List<VehicleModelDto>>(vehicleModels);
            return vehicleModelsDto;
                // await FindByCondition(p => p.TypeOfCustomerID.Equals(id)).ToListAsync();
        }
    }
}
