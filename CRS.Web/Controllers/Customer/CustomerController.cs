using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ITypeOfCustomerService _typeOfCustomerService;
        private readonly ICustomerService _customerService;
        public CustomerController(ITypeOfCustomerService typeOfCustomerService, ICustomerService customerService)
        {
            _typeOfCustomerService = typeOfCustomerService;
            _customerService =  customerService;
        }
        [HttpGet]
        [Authorize]
        [Route("GetTypes")]
        public async Task<ActionResult<IEnumerable<TypeOfCustomerDto>>> GetTypesOfCustomer()
        {
            return Ok(await _typeOfCustomerService.GetTypesCustomer());
        }
        [HttpPost]
        [Authorize]
        [Route("AddCustomer")]
        public async Task<ActionResult<int>> PostCustomer(CustomerDto customer)
        {
            
            return Ok(await _customerService.AddCustomer(customer));
        }
        [HttpGet]
        [Authorize]
        [Route("GetAllCustomers")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAll()
        {
            return Ok(await _customerService.GetCustomers());
        }

        [HttpGet]
        [Authorize]
        [Route("GetConcreteCustomers/{id}")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetConcreteCustomers(int id)
        {
            return Ok(await _customerService.GetConcreteTypeOfCustomers(id));
        }
        [HttpGet]
        [Authorize]
        [Route("GetCustomer/{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomerById(int id)
        {
            return Ok(await _customerService.GetCustomerById(id));
        }

        [HttpPut]
        [Authorize]
        [Route("PutCustomer/{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDto customerToUpdate)
        {
            await _customerService.UpdateCustomer(id, customerToUpdate);
            return Ok();
        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("DeleteCustomer/{id}")]

        public async Task<IActionResult> DeleteCustomer(int id)
        {
            await _customerService.Delete(id);
            return Ok();
        }
    }
}