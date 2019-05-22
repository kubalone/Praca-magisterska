using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Customers
{
    public class TypeOfCustomer
    {
        public int ID { get; set; }
        public string TypeName { get; set; }
        public ICollection<Customer> Customers { get; set; }
}
}
