using CRS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Repository
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> GetAsync(int id);
        Task InsertAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task SaveChangesAsync();
    }
}