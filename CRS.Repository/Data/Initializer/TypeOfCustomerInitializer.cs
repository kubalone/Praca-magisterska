using CRS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Repository.Data.Initializer
{
    public class TypeOfCustomerInitializer
    {
        public static async Task Initialize(CRSDbContext context)
        {

            var individualClient = "Osoba prywatna";
            var institutionalClient = "Przedsiębiorca";
            if (context.TypeofCustomer.Any())
            {
                return;
            }
            var typesOfCustomer = new TypeOfCustomer[]
            {
                new TypeOfCustomer {TypeName = individualClient},
                new TypeOfCustomer {TypeName = institutionalClient}

            };
            foreach (var item in typesOfCustomer)
            {
                await context.AddAsync(item);
            }
            await context.SaveChangesAsync();

        }
    }
}
