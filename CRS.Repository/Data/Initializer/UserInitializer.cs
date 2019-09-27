using CRS.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Repository.Data.Initializer
{
    public class UserInitializer
    {
        public static async Task Initialize(CRSDbContext context,
                                UserManager<ApplicationUser> userManager,
                                RoleManager<ApplicationRole> roleManager)
        {
            context.Database.EnsureCreated();

            string role1 = "Admin";
            string desc1 = "Rola administratora";
            string role2 = "Pracownik";
            string desc2 = "Rola pracownika";
            string password = "Muszlowa17!";
            if (await roleManager.FindByNameAsync(role1) == null)
            {
                var admin = new ApplicationRole()
                {
                    Name = role1,
                    NormalizedName = desc1
                };
                await roleManager.CreateAsync(admin);
            }
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                var employee = new ApplicationRole()
                {
                    Name = role2,
                    NormalizedName = desc2
                };
                await roleManager.CreateAsync(employee);
            }

            if (await userManager.FindByNameAsync("Admin") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "Admin",
                    Email = "kubalone@gmail.com",


                };
                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
            }

        }
    }
}
