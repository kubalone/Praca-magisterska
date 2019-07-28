using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
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
        [Route("GetTypes")]
        //Get: /api/Customer/GetTypes
        public async Task<ActionResult<IEnumerable<TypeOfCustomerDto>>> GetTypesOfCustomer()
        {
            return Ok(await _typeOfCustomerService.GetTypesCustomer());
        }
        [HttpPost]
        [Route("AddCustomer")]
        //Post: /api/Customer/AddCustomer
        public async Task<ActionResult<int>> PostCustomer(CustomerDto customer)
        {
            
            return Ok(await _customerService.AddCustomer(customer));
        }
        [HttpGet]
        [Route("GetAllCustomers")]
        //Get: /api/Customer/GetAllCustomers
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAll()
        {
            return Ok(await _customerService.GetCustomers());
        }

        [HttpGet]
        [Route("GetConcreteCustomers/{id}")]
        //Get: /api/Customer/GetConcreteCustomers
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetConcreteCustomers(int id)
        {
            return Ok(await _customerService.GetConcreteTypeOfCustomers(id));
        }
        [HttpGet]
        [Route("GetCustomer/{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomerById(int id)
        {
            return Ok(await _customerService.GetCustomerById(id));
        }
        [HttpPut]
        [Route("PutCustomer/{id}")]
        public async Task<IActionResult> PutCustomer(int id, CustomerDto customerToUpdate)
        {
            await _customerService.UpdateCustomer(id, customerToUpdate);
            return Ok();
        }
    }
}