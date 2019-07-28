using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Vehicle
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;
        private readonly IBrandService _brandService;
        private readonly IVehicleModelService _vehicleModelService;
        
        public VehicleController(IVehicleService vehicleService, IVehicleModelService vehicleModelService, IBrandService brandService)
        {
            _vehicleService = vehicleService;
            _vehicleModelService = vehicleModelService;
            _brandService = brandService;
        }
        [HttpGet]
        [Route("GetAllVehicle")]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAllVehicles()
        {
            return Ok(await _vehicleService.GetAllVehicle());
        }
        [HttpGet]
        [Route("GetVehicle/{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicleById(int id)
        {
            return Ok(await _vehicleService.GetVehicleById(id));
        }
        [HttpPost]
        [Route("CreateVehicle")]
        public async Task<IActionResult> CreateVehicle(VehicleDto vehicleDto)
        {
            await _vehicleService.CreateVehicle(vehicleDto);
            return Ok();
        }
        [HttpPut]
        [Route("PutVehicle/{id}")]
        public async Task<IActionResult> PutVehicle(int id, VehicleDto vehicleDto)
        {
            await _vehicleService.EditVehicle(id, vehicleDto);
            return Ok();
        }
        [HttpGet]
        [Route("GetAllBrands")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetAllBrands(){
            return Ok(await _brandService.GetAllBrands());
        }
        [HttpGet]
        [Route("GetConcreteModels/{id}")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetConcreteModels(int id)
        {
            return Ok(await _vehicleModelService.GetConcreteModels(id));
        }

    }
}