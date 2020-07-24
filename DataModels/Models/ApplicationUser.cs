using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataModels.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<Car> MyCars { get; set; }
    }
}
