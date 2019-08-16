using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Exceptions;
using CRS.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Services
{
    public class VehicleService : Repository<Vehicle>, IVehicleService
    {
        private readonly IMapper _mapper;
        public VehicleService(CRSDbContext repositoryContext, IMapper mapper)
            :base(repositoryContext)
        {
            _mapper = mapper;
        }
      
        public async Task CreateVehicle(VehicleDto vehicleDto)
        {
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            Insert(vehicle);
            await SaveChangesAsync();
        }
        public async Task EditVehicle(int id, VehicleDto vehicleDto)
        {
            if (id!=vehicleDto.Id)
            {
                throw new BadRequestException();
            }
            var vehicle = _mapper.Map<Vehicle>(vehicleDto);
            Update(vehicle);
            await SaveChangesAsync();
        }
        public async Task<IEnumerable<VehicleDto>> GetAllVehicle()
        {
            var vehicles = await GetAll().ToListAsync();
            var vehiclesDto = _mapper.Map<List<VehicleDto>>(vehicles);
            return vehiclesDto;
        }
        public async Task<VehicleDto> GetVehicleById(int id)
        {
            
            var vehicleWithOrders = await GetIncludeItems("Orders").ToListAsync();

            var vehicleToGet = vehicleWithOrders.Where(p => p.Id == id).FirstOrDefault();


            if (vehicleToGet == null)
            {
                throw new NotFoundException("Customer");
            }

            var vehicleDto = _mapper.Map<VehicleDto>(vehicleToGet);
            return vehicleDto;
        }
        public async Task<VehicleDto> GetVehicleByIdWithoutInclude(int id)
        {

            var vehicle = await GetAsync(id);


            if (vehicle == null)
            {
                throw new NotFoundException("Vehicle");
            }

            var vehicleDto = _mapper.Map<VehicleDto>(vehicle);
            return vehicleDto;
        }
        public async Task<VehicleDto> GetVehicleWithoutOrders(int vehicleId)
        {

         
            var vehicleById = await GetVehicleById(vehicleId);
            var vehicle = new VehicleDto()
            {
                Id = vehicleById.Id,
                Brand = vehicleById.Brand,
                Model = vehicleById.Model,
                ModelYear = vehicleById.ModelYear,
                Registration = vehicleById.Registration,
                Fuel = vehicleById.Fuel
            };
          
            return vehicle;

        }
        public async Task Delete(int id)
        {
            var vehicle = await GetAsync(id);
            if (vehicle == null)
            {
                throw new NotFoundException("vehicle to delete not exist");
            }

            Delete(vehicle);
            await SaveChangesAsync();

        }


    }
}
