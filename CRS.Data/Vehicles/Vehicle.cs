using CRS.Data.Customers;
using CRS.Data.Orders;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Vehicles
{
    public class Vehicle
    {
        public int ID { get; set; }
        public int? CustomerID { get; set; }
        //Samochód może mieć wiele napraw
        public ICollection<OrderVehicle> OrderVehicles { get; set; }
        //jeden samochód może miec jedengo klienta
        public Customer Customer{ get; set; }
    }
}
