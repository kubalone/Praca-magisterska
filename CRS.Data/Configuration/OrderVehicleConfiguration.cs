using CRS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace CRS.Data.Configuration
{
    public class OrderVehicleConfiguration : IEntityTypeConfiguration<OrderVehicle>
    {
        public void Configure(EntityTypeBuilder<OrderVehicle> builder)
        {
            builder.HasKey(ov => new { ov.OrderID, ov.VehicleID });
        }
    }
}
