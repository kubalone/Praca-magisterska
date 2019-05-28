using CRS.Data.Entities;
using CRS.Repository;
using CRS.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface ITypeOfCustomerService: IRepository<TypeOfCustomer>
    {
         Task<IEnumerable<TypeOfCustomerDto>> GetTypesCustomer();
    }
}
