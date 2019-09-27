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
        public bool IsFinished { get; set; }
        public virtual Customer Customer { get; set; }
        public int VehicleId{ get; set; }  
        public virtual Vehicle Vehicle { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
    }
}
