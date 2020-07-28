using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MOJAuto.Repository
{
    public interface IMOJAutoRepository
    {
        // create
        void Add<TEntity>(TEntity entity) where TEntity : class;

        // delete
        void Delete<TEntity>(TEntity entity) where TEntity : class;

        // read
        Task<TEntity> GetById<TEntity>(int Id) where TEntity : class;
        Task<IEnumerable<TEntity>> GetAll<TEntity>() where TEntity : class;
        IQueryable<TEntity> Filter<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;

        Task<bool> SaveAll();

    }
}
