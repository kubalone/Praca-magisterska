using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.DTO
{
   public class OrderDto
    {
        public int Id { get; set; }
        public string RepairDetails { get; set; }
        public string TypeOfNotification { get; set; }
        public int CustomerID { get; set; }
        public int VehicleId { get; set; }
    }
}
