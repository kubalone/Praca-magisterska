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

            // String adminId1 = "";


            string role1 = "Admin";
            string desc1 = "Rola administratora";

            string role2 = "Pracownik";
            string desc2 = "Rola pracownika";

            string password = "Muszlowa17!";
            //dodawanie roli administratora
            if (await roleManager.FindByNameAsync(role1) == null)
            {
                var admin = new ApplicationRole()
                {
                    Name = role1,
                    NormalizedName = desc1
                };
                await roleManager.CreateAsync(admin);
            }
            //dodawanie roli pracownika
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                var employee = new ApplicationRole()
                {
                    Name = role2,
                    NormalizedName = desc2
                };
                await roleManager.CreateAsync(employee);
            }

            //tworzenie konta administratora
            if (await userManager.FindByNameAsync("Admin") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "Admin",
                    Email = "kubalone@gmail.com",


                };

                var result = await userManager.CreateAsync(user);
                //dodawanie roli administratorowi
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                //adminId1 = user.Id;

            }

        }
    }
}
