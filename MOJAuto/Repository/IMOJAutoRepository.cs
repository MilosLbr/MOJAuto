using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MOJAuto.Repository
{
    public interface IMOJAutoRepository<TEntity> where TEntity : class
    {
        // create
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);

        // delete
        void Delete(TEntity entity);
        void DeleteRange(IEnumerable<TEntity> entities);

        // read
        Task<TEntity> GetById(int Id);
        Task<IEnumerable<TEntity>> GetAll(); 
        IQueryable<TEntity> Filter(Expression<Func<TEntity, bool>> predicate);

        Task<bool> SaveAll();

    }
}
