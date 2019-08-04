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
        private IOrderService _orderService;
        public OrderController(ICustomerService customerService, IOrderService orderService)
        {
            _customerService = customerService;
            _orderService = orderService;
        }
        [HttpGet]
        [Route("GetCustomersWithVehicles")]
        public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomersWithVehicle()
        {
            return Ok(await _customerService.GetCustomersWithVehicles());
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll()
        {
            return Ok(await _orderService.GetAllOrders());
        }

        [HttpGet]
        [Route("GetFinishedOrders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetFinishedOrders()
        {
            return Ok(await _orderService.GetFinishedOrders());
        }


        [HttpGet]
        [Route("GetActualOrders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetActualOrders()
        {
            return Ok(await _orderService.GetActualOrders());
        }


        [HttpGet]
        [Route("GetOrder/{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            return Ok(await _orderService.GetOrderById(id));
        }
        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            await _orderService.CreateOrder(orderDto);
            return Ok();
        }
        [HttpPut]
        [Route("PutOrder/{id}")]
        public async Task<IActionResult> PutOrder(int id, OrderDto orderDto)
        {
            await _orderService.EditOrder(id, orderDto);
            return Ok();
        }
        [HttpPut]
        [Route("ChangeStatus/{id}")]
        public async Task<IActionResult> ChangeStatus(int id, [FromBody]bool status)
        {
            await _orderService.ChangeStatus(id, status);
            return Ok();
        }
    }
}