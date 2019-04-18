using CRS.DAL.DataContext;
using CRS.Data.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.DAL.Initializer
{
    public static class UserInitializer
    {

        public static async Task Initialize(ApplicationDbContext context,
                                UserManager<ApplicationUser> userManager,
                                RoleManager<ApplicationRole> roleManager)
        {
            context.Database.EnsureCreated();

            String adminId1 = "";
            //String adminId2 = "";

            string role1 = "Admin";
            string desc1 = "This is the administrator role";

            //string role2 = "Member";
            //string desc2 = "This is the members role";

            string password = "Muszlowa17!";

            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role1, desc1));
            }
          

            if (await userManager.FindByNameAsync("Admin") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "Administrator",
                    Login = "Admin",
                    Email = "kubalone@gmail.com",
                    
                  
                };

                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId1 = user.Id;
            }

        }
    }
}
