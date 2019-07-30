using CRS.Data.Configuration;
using CRS.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Repository.Data
{
    public class CRSDbContext :  IdentityDbContext<
        ApplicationUser, ApplicationRole, string,
        IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public CRSDbContext(DbContextOptions<CRSDbContext> options) : base(options)
        {

        }
     

        public DbSet<Customer> Customer { get; set; }
        public DbSet<TypeOfCustomer> TypeofCustomer { get; set; }
        public DbSet<Vehicle> Vehicle { get; set; }
        public DbSet<Order> Order { get; set; }
      
        public  DbSet<VehicleModel> VehicleModel{ get; set; }
        public DbSet<Brand> Brand{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
     
            modelBuilder.ApplyConfiguration(new VehicleModelConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ApplicationUserConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
          
            modelBuilder.ApplyConfiguration(new VehicleConfiguration());
         


        }
    }
}

