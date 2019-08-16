using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Order
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private ICustomerService _customerService;
        private IOrderService _orderService;
        public OrderController(ICustomerService customerService, IOrderService orderService)
        {
            _customerService = customerService;
            _orderService = orderService;
        }
        [HttpGet]
        [Authorize]
        [Route("GetCustomersWithVehicles")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomersWithVehicle()
        {
            return Ok(await _customerService.GetCustomersWithVehicles());
        }
        [HttpGet]
        [Authorize]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll()
        {
            return Ok(await _orderService.GetAllOrders());
        }

        [HttpGet]
        [Authorize]
        [Route("GetFinishedOrders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetFinishedOrders()
        {
            return Ok(await _orderService.GetFinishedOrders());
        }


        [HttpGet]
        [Authorize]
        [Route("GetActualOrders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetActualOrders()
        {
            return Ok(await _orderService.GetActualOrders());
        }


        [HttpGet]
        [Authorize]
        [Route("GetOrder/{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            return Ok(await _orderService.GetOrderById(id));
        }
        [HttpPost]
        [Authorize]
        [Route("AddOrder")]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            await _orderService.CreateOrder(orderDto);
            return Ok();
        }
        [HttpPut]
        [Authorize]
        [Route("EditOrder/{id}")]
        public async Task<IActionResult> EditOrder(int id, OrderDto orderDto)
        {
            await _orderService.EditOrder(id, orderDto);
            return Ok();
        }
        [HttpGet]
        [Authorize]
        [Route("ChangeStatus/{id}/{status}")]
        public async Task<IActionResult> ChangeStatus(int id, bool status)
        {
            await _orderService.ChangeStatus(id, status);
            return Ok();
        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("DeleteOrder/{id}")]
       
        public async Task<IActionResult> DeleteOrder(int id)
        {
            await _orderService.Delete(id);
            return Ok();
        }
    }
}