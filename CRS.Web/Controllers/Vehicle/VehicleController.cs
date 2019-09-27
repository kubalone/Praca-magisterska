using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
       // [Authorize]
        [Route("GetAllVehicle")]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAllVehicles()
        {
            return Ok(await _vehicleService.GetAllVehicle());
        }
        [HttpGet]
        //[Authorize]
        [Route("GetVehicle/{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicleById(int id)
        {
            return Ok(await _vehicleService.GetVehicleById(id));
        }
        [HttpGet]
        [Authorize]
        [Route("GetVehicleByIdWithoutInclude/{id}")]
        public async Task<ActionResult<VehicleDto>> GetVehicleByIdWithoutInclude(int id)
        {
            return Ok(await _vehicleService.GetVehicleByIdWithoutInclude(id));
        }
        [HttpPost]
       // [Authorize]
        [Route("CreateVehicle")]
        public async Task<IActionResult> CreateVehicle(VehicleDto vehicleDto)
        {
            await _vehicleService.CreateVehicle(vehicleDto);
            return Ok();
        }
        [HttpPut]
        //[Authorize]
        [Route("PutVehicle/{id}")]
        public async Task<IActionResult> PutVehicle(int id, VehicleDto vehicleDto)
        {
            await _vehicleService.EditVehicle(id, vehicleDto);
            return Ok();
        }
        [HttpGet]
        [Authorize]
        [Route("GetAllBrands")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetAllBrands(){
            return Ok(await _brandService.GetAllBrands());
        }
        [HttpGet]
        [Authorize]
        [Route("GetConcreteModels/{id}")]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetConcreteModels(int id)
        {
            return Ok(await _vehicleModelService.GetConcreteModels(id));
        }
        [HttpDelete]
        //[Authorize(Roles = "Admin")]
        [Route("DeleteVehicle/{id}")]

        public async Task<IActionResult> DeleteVehicle(int id)
        {
            await _vehicleService.Delete(id);
            return Ok();
        }

    }
}