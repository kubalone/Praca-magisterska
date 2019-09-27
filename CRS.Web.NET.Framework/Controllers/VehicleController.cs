using CRS.Service.DTO;
using CRS.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CRS.Web.NET.Framework.Controllers
{
    public class VehicleController : ApiController
    {
        private  IVehicleService _vehicleService;


        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;

        }
        [HttpGet]
      
      
        public async Task<IHttpActionResult> GetAllVehicles()
        {
            return Ok(await _vehicleService.GetAllVehicle());
        }
      
      
        [HttpPost]
 

        public async Task<IHttpActionResult> CreateVehicle(VehicleDto vehicleDto)
        {
            await _vehicleService.CreateVehicle(vehicleDto);
            return Ok();
        }
        [HttpPut]
        [Route("api/vehicle/PutVehicle/{id}")]
        public async Task<IHttpActionResult> PutVehicle(int id, VehicleDto vehicleDto)
        {
            await _vehicleService.EditVehicle(id, vehicleDto);
            return Ok();
        }
 
        [HttpDelete]
    

        public async Task<IHttpActionResult> DeleteVehicle(int id)
        {
            await _vehicleService.Delete(id);
            return Ok();
        }
    }
}
