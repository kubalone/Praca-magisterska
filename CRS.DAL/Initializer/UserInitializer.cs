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

            string role2 = "Mechanic";
            string desc2 = "This is the mechanic role";

            string password = "Muszlowa17!";
            //dodawanie roli administratora
            if (await roleManager.FindByNameAsync(role1) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role1, desc1));
            }
            //dodawanie roli pracownika (mechanika)
            if (await roleManager.FindByNameAsync(role2) == null)
            {
                await roleManager.CreateAsync(new ApplicationRole(role2, desc2));
            }

            //tworzenie konta administratora
            if (await userManager.FindByNameAsync("Admin") == null)
            {
                var user = new ApplicationUser
                {
                    UserName = "Administrator",
                    Email = "kubalone@gmail.com",
                    
                  
                };

                var result = await userManager.CreateAsync(user);
                //dodawanie roli administratorowi
                if (result.Succeeded)
                {
                    await userManager.AddPasswordAsync(user, password);
                    await userManager.AddToRoleAsync(user, role1);
                }
                adminId1 = user.Id;

                //if (await userManager.FindByNameAsync("mm@mm.mm") == null)
                //{
                //    var user = new ApplicationUser
                //    {
                //        UserName = "mm@mm.mm",
                //        Email = "mm@mm.mm",
                //        FirstName = "Mike",
                //        LastName = "Myers",
                //        Street = "Yew St",
                //        City = "Vancouver",
                //        Province = "BC",
                //        PostalCode = "V3U E2Y",
                //        Country = "Canada",
                //        PhoneNumber = "6572136821"
                //    };

                //    var result = await userManager.CreateAsync(user);
                //    if (result.Succeeded)
                //    {
                //        await userManager.AddPasswordAsync(user, password);
                //        await userManager.AddToRoleAsync(user, role2);
                //    }
                //}
            }

        }
    }
}
