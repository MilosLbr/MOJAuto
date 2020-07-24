using Microsoft.EntityFrameworkCore;
using MOJAuto.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MOJAuto.Repository
{
    public class MOJAutoRepository<TEntity> : IMOJAutoRepository<TEntity> where TEntity : class
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<TEntity> Entities;

        public MOJAutoRepository(ApplicationDbContext context)
        {
            _context = context;
            Entities = _context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            Entities.Add(entity);
        }

        public void AddRange(IEnumerable<TEntity> entities)
        {
            Entities.AddRange(entities);
        }

        public void Delete(TEntity entity)
        {
            Entities.Remove(entity);
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            Entities.RemoveRange(entities);
        }

        public IQueryable<TEntity> Filter(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            return Entities.Where(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await Entities.ToListAsync();
        }

        public async Task<TEntity> GetById(int Id)
        {
            return await Entities.FindAsync(Id);
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
