using CRS.Data.Entities;
using CRS.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
        public IQueryable<T> GetWithOrderByDescending<TKey>(Expression<Func<T, TKey>> expression)
      
        {
            return _context.Set<T>()
                .OrderByDescending(expression);
        }
        public IQueryable<T> GetWithOrderByDescendingAndCondition<TKey>(Expression<Func<T, TKey>> expression, Expression<Func<T, bool>> condition)

        {
            return _context.Set<T>()
                .OrderByDescending(expression)
                .Where(condition);
        }
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return _context.Set<T>()
                .Where(expression);
        }
        public IQueryable<T> GetIncludeItems(params string[] navigationProperties)
        {
            var query = _context.Set<T>().AsQueryable();
            foreach (var property in navigationProperties)
            {
                query = query.Include(property);
            }
            return query;
        }
        public async Task<T>  GetAsync(int id)
        {
             
             var entity = await entities.FindAsync(id);
            _context.Entry(entity).State = EntityState.Detached;
            return entity;
        }

        public  void Insert(T entity)
        {
            _context.Set<T>().Add(entity);

        }
        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);

        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
       

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

      
    }
}