using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Exceptions;
using CRS.Service.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Services
{
    public class OrderService : Repository<Order>, IOrderService
    {
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;
        private readonly IVehicleService _vehicleService;
        public OrderService(CRSDbContext repositoryContext, IMapper mapper, ICustomerService customerService, IVehicleService vehicleService)
            : base(repositoryContext)
        {
            _customerService = customerService;
            _vehicleService = vehicleService;
            _mapper = mapper;
        }

        public async Task CreateOrder(OrderDto orderDto)
        {
            orderDto.IsFinished = false;
            orderDto.CreatedAt = DateTime.Now;
            var order = _mapper.Map<Order>(orderDto);
            Insert(order);
            await SaveChangesAsync();
        }

        public async Task ChangeStatus(int id, bool status)
        {
            var order = await GetAsync(id);
            if (order==null)
            {
                throw new NotFoundException("Zlecenie nie zostało odnalezione");
            }
            order.IsFinished = status;
           
            if (status==true)
            {
                order.FinishedAt = DateTime.Now;
            }
            else
            {
                order.FinishedAt = null;
            }

            Update(order);
            await SaveChangesAsync();
        }


        public async Task EditOrder(int id, OrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                throw new BadRequestException();
            }
            var orderFromDB = await GetAsync(orderDto.Id);
            orderDto.CreatedAt = orderFromDB.CreatedAt;
            if (orderFromDB.FinishedAt!=null)
            {
                orderDto.FinishedAt = orderFromDB.FinishedAt;
            }
            var order = _mapper.Map<Order>(orderDto);
            Update(order);
            await SaveChangesAsync();
        }

    
      
        public async Task<IEnumerable<OrderDto>> GetFinishedOrders()
        {
            var orders = await GetWithOrderByDescendingAndCondition(p=>p.Id, p => p.IsFinished==true).ToListAsync();
            var ordersDto = _mapper.Map<List<OrderDto>>(orders);
            var ordersDtoWithItems = await GetItemsForOrder(ordersDto);
            return ordersDtoWithItems;
        }
        public async Task<IEnumerable<OrderDto>> GetActualOrders()
        {
            var orders = await GetWithOrderByDescendingAndCondition(p => p.Id, p => p.IsFinished == false).ToListAsync();
            var ordersDto = _mapper.Map<List<OrderDto>>(orders);
            var ordersDtoWithItems = await GetItemsForOrder(ordersDto);
            return ordersDtoWithItems;
        }


        public async Task<OrderDto> GetOrderById(int id)
        {
            var order = await GetAsync(id);
            if (order == null)
            {
                throw new NotFoundException("Zlecenie nie zostało odnalezione");
            }

            
            var orderDto = _mapper.Map<OrderDto>(order);
            orderDto.Vehicle = await _vehicleService.GetVehicleById(orderDto.VehicleId);
            orderDto.Customer = await _customerService.GetCustomerById(orderDto.CustomerID);
            
            return orderDto;
        }
        public async Task<IEnumerable<OrderDto>> GetAllOrders()
        {
            var orders = await GetWithOrderByDescending(p => p.Id).ToListAsync();


            var ordersDto = _mapper.Map<List<OrderDto>>(orders);
            var ordersWithItems = await GetItemsForOrder(ordersDto);
            return ordersWithItems;
        }
        

        public async Task<List<OrderDto>> GetItemsForOrder(List<OrderDto> ordersDto)
        {
            foreach (var item in ordersDto)
            {

             

                item.Customer = await _customerService.GetCustomerById(item.CustomerID);
                item.Vehicle = await _vehicleService.GetVehicleByIdWithoutInclude(item.VehicleId);
               

            }
          

            return ordersDto;
        }
        public async Task Delete(int id)
        {
            var order = await GetAsync(id);
            if (order == null)
            {
                throw new NotFoundException("order to delete not exist");
            }

            Delete(order);
            await SaveChangesAsync();

        }

    }
}
