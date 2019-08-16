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
        
        public async Task<int> AddCustomer(CustomerDto customerDto)
        {
            customerDto.DateTimeAddCustomer = DateTime.Now;
            var customer = _mapper.Map<Customer>(customerDto);
            Insert(customer);
            await SaveChangesAsync();
            return customer.Id;
        }
        public async Task<IEnumerable<CustomerDto>> GetCustomers()
        {
            var customers = await GetAll()
                .OrderByDescending(p=>p.DateTimeAddCustomer)
                .ToListAsync();
            var customersDto = _mapper.Map<List<CustomerDto>>(customers);
            return customersDto;
        }
        public async Task<IEnumerable<CustomerDto>> GetCustomersWithVehicles()
        {

            var customers = await GetIncludeItems("Vehicles").ToListAsync();
            var customersDto = _mapper.Map<List<CustomerDto>>(customers);
            return customersDto;
        }
        public async Task<IEnumerable<CustomerDto>> GetConcreteTypeOfCustomers(int id)
        {
            var customers = await FindByCondition(p => p.TypeOfCustomerID.Equals(id)).ToListAsync();
          

            var customersDto = _mapper.Map<List<CustomerDto>>(customers);
            return customersDto;
        }
        public async Task <CustomerDto> GetCustomerById(int id)
        {

            var customerWithVehicles = await GetIncludeItems("Vehicles","Orders").ToListAsync();
  
            var customerToGet = customerWithVehicles.Where(p => p.Id == id).FirstOrDefault();
               
          
            if (customerToGet == null)
            {
                throw new NotFoundException("Customer");
            }

            var customerDto = _mapper.Map<CustomerDto>(customerToGet);
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
        public async Task Delete(int id)
        {
            var customerWithVehicles = await GetIncludeItems("Vehicles", "Orders").ToListAsync();

            var customerToDelete = customerWithVehicles.Where(p => p.Id == id).FirstOrDefault();

            
            if (customerToDelete == null)
            {
                throw new NotFoundException("customer to delete not exist");
            }

            Delete(customerToDelete);
            await SaveChangesAsync();

        }


    }
}
