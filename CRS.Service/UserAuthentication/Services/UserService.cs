using CRS.Data.Users;
using CRS.Data.Users.ResourceModel;
using CRS.Service.UserAuthentication.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.UserAuthentication.Services
{
    public class UserService: IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public UserService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<Object> Register(RegisterResourceModel model)
        {
            var aplicationUser = new IdentityUser
            {
                UserName = model.UserName,
                //FirstName=model.FirstName,
                //LastName=model.LastName,
                //City=model.City,
                //TelephoneNumber=model.TelephoneNumber,
                //PostalCode=model.PostalCode,
                //Street=model.Street,
                //HouseNumber=model.HouseNumber,
                //ApartmentNumber=model.ApartmentNumber

            };
            try
            {
                var result = await _userManager.CreateAsync(aplicationUser, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(aplicationUser, "Employee");
                }
             
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
