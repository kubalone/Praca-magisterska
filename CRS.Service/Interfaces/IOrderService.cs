using CRS.Data.Entities;
using CRS.Repository;
using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllOrders();
        Task<OrderDto> GetOrderById(int id);
        Task CreateOrder(OrderDto orderDto);
        Task EditOrder(int id, OrderDto orderDto);
        Task ChangeStatus(int id, bool status);
        Task Delete(int id);
        Task<IEnumerable<OrderDto>> GetFinishedOrders();
        Task<IEnumerable<OrderDto>> GetActualOrders();

    }
}
