using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface IVehicleModelService
    {
        Task<IEnumerable<VehicleModelDto>> GetConcreteModels(int id);
    }
}
