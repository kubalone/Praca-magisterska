using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Exceptions;
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
        public async Task <CustomerDto> GetCustomerById(int id)
        {
            var customer = await GetAsync(id);
            if (customer == null)
            {
                throw new NotFoundException("Customer");
            }
            var customerDto = _mapper.Map<CustomerDto>(customer);
            return customerDto;
        }
        public async Task UpdateCustomer(int id, CustomerDto customerToUpdate)
        {
            if (id != customerToUpdate.Id)
            {
                throw new BadRequestException();
            }
            var customer = _mapper.Map<Customer>(customerToUpdate);
            Update(customer);
            await SaveChangesAsync();
        }

    }
}
