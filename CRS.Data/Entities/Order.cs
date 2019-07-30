using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class Order : BaseEntity
    {

        public string RepairDetails { get; set; }
        public string TypeOfNotification { get; set; }
        public int CustomerID { get; set; }
        public Customer Customer { get; set; }
        public int VehicleId{ get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
