using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace CRS.Repository.Data
{
    public class CRSDbContextFactory : IDesignTimeDbContextFactory<CRSDbContext>
    {
        public CRSDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CRSDbContext>();
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=CarRepairSystemDB;Trusted_Connection=True;");

            return new CRSDbContext(optionsBuilder.Options);
        }
    }
}
