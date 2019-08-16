using CRS.Data.Entities;
using CRS.Repository;
using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface ICustomerService: IRepository<Customer>
    {
        Task<int> AddCustomer(CustomerDto customerDto);
        Task<IEnumerable<CustomerDto>> GetCustomers();
        Task<IEnumerable<CustomerDto>> GetCustomersWithVehicles();
        Task<IEnumerable<CustomerDto>> GetConcreteTypeOfCustomers(int id);
        Task<CustomerDto> GetCustomerById(int id);
        Task UpdateCustomer(int id, CustomerDto customerToUpdate);
        Task Delete(int id);

    }
}
