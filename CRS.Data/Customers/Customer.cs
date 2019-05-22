using CRS.Data.Orders;
using CRS.Data.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Customers
{
    public class Customer
    {
        public int ID { get; set; }
        //typ użytkownika
        public int? TypeOfCustomerID { get; set; }
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
        //Jeden klient może mieć wiele napraw
        public ICollection<Order> Orders{ get; set; }
        //Jeden klient może mieć tylko jeden typ klienta
        public TypeOfCustomer TypeOfCustomer { get; set; }
        //Jeden użytkownik może mieć wiele samochodow
        public ICollection<Vehicle> Vehicles{ get; set; }



    }
}