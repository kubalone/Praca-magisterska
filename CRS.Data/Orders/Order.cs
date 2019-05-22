using CRS.Data.Customers;
using CRS.Data.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Orders
{
    public class Order
    {
        public int ID { get; set; }
        public int? CustomerID { get; set; }
        public Customer Customer { get; set; }
        public ICollection<OrderVehicle> OrderVehicles{ get; set; }
    }
}
