//using CRS.DAL.DataContext;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Text;
//using System.Threading.Tasks;
//using System.Linq;
//using CRS.Service.Customer.Interfaces;
//using CRS.Data.Customers;

//namespace CRS.Service.Customer.Services
//{
//    public class TypeOfCustomerService: ITypeOfCustomerService
//    {
//        private readonly ApplicationDbContext _dbContext;

//        public TypeOfCustomerService(ApplicationDbContext dbContext)
//        {
//            _dbContext = dbContext;
//        }
//        public async Task<ActionResult<IEnumerable<TypeOfCustomer>>> GetTypesCustomer()
//        {
//            var types = await _dbContext.TypeofCustomers.ToListAsync();
//            return types;
//        }
//    }
//}
