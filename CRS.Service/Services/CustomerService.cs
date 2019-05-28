using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Services
{
    public class CustomerService: Repository<Customer>, ICustomerService
    {
        private readonly IMapper _mapper;
        public CustomerService(CRSDbContext repositoryContext, IMapper mapper)
            :base(repositoryContext)
        {
            _mapper = mapper;
        }
        
        public async Task AddCustomer(CustomerDto customerDto)
        {
            customerDto.DateTimeAddCustomer = DateTime.Now;
            var customer = _mapper.Map<Customer>(customerDto);
            await InsertAsync(customer);
            await SaveChangesAsync();
        }
        public async Task<IEnumerable<CustomerDto>> GetCustomers()
        {
            var customers = await GetAll()
                .OrderByDescending(p=>p.DateTimeAddCustomer)
                .ToListAsync();
            var customersDto = _mapper.Map<List<CustomerDto>>(customers);
            return customersDto;
        }
        public async Task<IEnumerable<CustomerDto>> GetConcreteTypeOfCustomers(int id)
        {
            var customers = await GetAll()
                .Where(p => p.TypeOfCustomerID == id)
                .ToListAsync();
            var customersDto = _mapper.Map<List<CustomerDto>>(customers);
            return customersDto;
        }
    }
}
