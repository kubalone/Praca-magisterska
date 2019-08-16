using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface IVehicleService
    {
        Task<VehicleDto> GetVehicleById(int id);
        Task<IEnumerable<VehicleDto>> GetAllVehicle();
        Task EditVehicle(int id, VehicleDto vehicleDto);
        Task CreateVehicle(VehicleDto vehicleDto);
        Task<VehicleDto> GetVehicleWithoutOrders(int vehicleId);
        Task<VehicleDto> GetVehicleByIdWithoutInclude(int id);
        Task Delete(int id);



    }
}
