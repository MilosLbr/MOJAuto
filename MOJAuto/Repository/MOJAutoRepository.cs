using Microsoft.EntityFrameworkCore;
using MOJAuto.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOJAuto.Repository
{
    public class MOJAutoRepository : IMOJAutoRepository
    {
        private readonly ApplicationDbContext _context;

        public MOJAutoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Add(entity);
        }


        public void Delete<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Remove(entity);
        }

        public IQueryable<TEntity> Filter<TEntity>(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAll<TEntity>() where TEntity : class
        {
            return await _context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetById<TEntity>(int Id) where TEntity : class
        {
            return await _context.Set<TEntity>().FindAsync(Id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }

    }
}
