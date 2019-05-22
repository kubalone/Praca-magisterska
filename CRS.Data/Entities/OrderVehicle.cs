using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class OrderVehicle
    {
        public int OrderID { get; set; }
        public Order Orer { get; set; }
        public int VehicleID { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
