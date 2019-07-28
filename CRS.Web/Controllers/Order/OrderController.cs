using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Order
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private ICustomerService _customerService;
        public OrderController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet]
        [Route("GetCustomersWithVehicles")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomersWithVehicle()
        {
            return Ok(await _customerService.GetCustomersWithVehicles());
        }
    }
}