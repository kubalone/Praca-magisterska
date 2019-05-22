using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class Order : BaseEntity
    {
        
        public int? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public ICollection<OrderVehicle> OrderVehicles { get; set; }
    }
}
