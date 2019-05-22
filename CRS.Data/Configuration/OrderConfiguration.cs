using System;
using System.Collections.Generic;
using System.Text;
using CRS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace CRS.Data.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasOne<Customer>(s => s.Customer)
                   .WithMany(g => g.Orders)
                   .HasForeignKey(s => s.CustomerID);
        }
    }
}
