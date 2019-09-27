using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class Customer:BaseEntity
    {
        public int TypeOfCustomerID { get; set; }
        public DateTime DateTimeAddCustomer { get; set; }
        public string CompanyName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string NumberOfBuilding { get; set; }
        public string NumberOfApartment { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual TypeOfCustomer TypeOfCustomer { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}
