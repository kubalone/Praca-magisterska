using CRS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Configuration
{
    public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            builder.HasOne<Customer>(s => s.Customer)
                 .WithMany(g => g.Vehicles)
                 .HasForeignKey(s => s.CustomerID);
        }
    }
}
