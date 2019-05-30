using CRS.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Configuration
{
    public class VehicleModelConfiguration: IEntityTypeConfiguration<VehicleModel>
    {
        public void Configure(EntityTypeBuilder<VehicleModel> builder)
        {
            builder.HasOne<Brand>(b => b.Brand)
                .WithMany(p => p.VehicleModels)
                .HasForeignKey(s => s.BrandId);
        }
    }
}

