using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ICollection<ApplicationUserRole> UserRoles { get; set; }

    }
}

