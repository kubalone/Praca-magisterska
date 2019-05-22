using System;
using System.Collections.Generic;
using System.Text;
using CRS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CRS.Data.Configuration
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasOne<TypeOfCustomer>(s => s.TypeOfCustomer)
                   .WithMany(g => g.Customers)
                   .HasForeignKey(s => s.TypeOfCustomerID);
        }
    }
}
