using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.DTO
{
    public class OrderDetailsDto
    {
        public int Id { get; set; }
        public string RepairDetails { get; set; }
        public string TypeOfNotification { get; set; }
        public bool IsFinished { get; set; }
        public VehicleDto Vehicle { get; set; }
        public CustomerDto Customer { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? FinishedAt { get; set; }
    }
}
