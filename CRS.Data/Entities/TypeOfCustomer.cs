using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class TypeOfCustomer: BaseEntity
    {
        public string TypeName { get; set; }
        public ICollection<Customer> Customers { get; set; }
    }
}
