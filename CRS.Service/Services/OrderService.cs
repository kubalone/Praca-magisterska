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
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Services
{
    public class OrderService : Repository<Order>, IOrderService
    {
        private readonly IMapper _mapper;
        public OrderService(CRSDbContext repositoryContext, IMapper mapper)
            : base(repositoryContext)
        {
            _mapper = mapper;
        }

        public async Task CreateOrder(OrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            Insert(order);
            await SaveChangesAsync();
        }

        public async Task EditOrder(int id, OrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                throw new BadRequestException();
            }
            var order = _mapper.Map<Order>(orderDto);
            Update(order);
            await SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrders()
        {
            var orders = await GetAll().ToListAsync();
            var ordersDto = _mapper.Map<List<OrderDto>>(orders);
            return ordersDto;
        }

        public async Task<OrderDto> GetOrderById(int id)
        {
            var order = await GetAsync(id);
            if (order == null)
            {
                throw new NotFoundException("Zlecenie nie zostało odnalezione");
            }
            var orderDto = _mapper.Map<OrderDto>(order);
            return orderDto;
        }
    }
}
