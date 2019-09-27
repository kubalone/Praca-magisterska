using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class VehicleModel : BaseEntity
    {
        public int BrandId { get; set; }
        public string Name { get; set; }
        public virtual Brand Brand { get; set; }
    }
}
