
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text;

namespace CRS.Data.Users
{
    public class ApplicationUser: IdentityUser
    {
        public ApplicationUser() : base() { }

        
        public string Login { get; set; }

    }
}