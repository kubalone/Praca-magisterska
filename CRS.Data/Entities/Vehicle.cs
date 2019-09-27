using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class Vehicle: BaseEntity
    {
        public string ModelYear { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Registration { get; set; }
        public string VIN { get; set; }
        public string Colour { get; set; }
        public string Fuel { get; set; }
        public string MileAge { get; set; }
        public string Power { get; set; }
        public string DisplacementCapacity { get; set; }
        public int CustomerID { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual Customer Customer { get; set; }
    }
}
