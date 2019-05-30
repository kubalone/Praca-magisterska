using CRS.Data.Entities;
using CRS.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Repository
{
    public class Repository<T>: IRepository<T> where T : class
    {
        private readonly CRSDbContext _context;
        private DbSet<T> entities;
        string errorMessage = string.Empty;

        public Repository(CRSDbContext context)
        {
           _context = context;
            entities = context.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsNoTracking();
        }

        public async Task<T>  GetAsync(int id)
        {
            return await entities.FindAsync(id);
        }


        public async Task InsertAsync(T entity)
        {
            var set = _context.Set<T>();
            await set.AddAsync(entity);
        }

        public void Update(T entity)
        {
            var set = _context.Set<T>();
            set.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            var set = _context.Set<T>();
            set.Remove(entity);
        }
       

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

      
    }
}