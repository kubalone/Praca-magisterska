﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerManagementController : ControllerBase
    {
        //private readonly ITypeOfCustomerService _typeOfCustomerService;
        //public CustomerManagementController(ITypeOfCustomerService typeOfCustomerService)
        //{
        //    _typeOfCustomerService = typeOfCustomerService;
        //}
        //[HttpGet]
        //[Route("GetTypes")]
        ////Get: /api/CustomerManagement/GetTypes
        //public async Task<ActionResult<IEnumerable<TypeOfCustomer>>> GetTypesOfCustomer()
        //{
        //    return await _typeOfCustomerService.GetTypesCustomer();
        //}
        //[HttpPost]
        //[Route("AddCustomer")]
        //public async Task<IActionResult> PostCustomer(Customer customer)
        //{

        //}
    }
}