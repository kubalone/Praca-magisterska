using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class Brand:BaseEntity
    {
        public string Name { get; set; }
        public virtual ICollection<VehicleModel> VehicleModels { get; set; }
    }
}
