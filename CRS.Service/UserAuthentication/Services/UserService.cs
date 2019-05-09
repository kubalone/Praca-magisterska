using CRS.DAL.DataContext;
using CRS.Data.Users;
using CRS.Data.Users.AplicationSetting;
using CRS.Data.Users.ResourceModel;
using CRS.Service.UserAuthentication.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.UserAuthentication.Services
{

    public class UserService: IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly JWTSettings _jwtSettings;
        private readonly ApplicationDbContext _dbContext;
        public UserService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ApplicationDbContext dbContext ,IOptions<JWTSettings> jwtSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtSettings = jwtSettings.Value;
            _dbContext = dbContext;
        }

        public async Task<ObjectResult> Register(RegisterResourceModel model)
        {
            var aplicationUser = new IdentityUser
            {
                UserName = model.UserName,          
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
        public async Task<ObjectResult> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user==null)
            {
                return new ObjectResult(new { message = "Wybrany użytkownik nie istnieje w bazie." });

            }

            try
            {

                var result = await _userManager.DeleteAsync(user);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
           
        }
        //public async Task<ObjectResult> Login(LoginResourceModel model)
        //{
        //    var user = await _userManager.FindByNameAsync(model.Username);

        //    if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        //    {
        //        var role = await _userManager.GetRolesAsync(user);
        //       IdentityOptions _options = new IdentityOptions();
        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(new Claim[]
        //          {
        //                new Claim("UserID",user.Id.ToString()),
        //               new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
        //          }),
        //            Expires = DateTime.UtcNow.AddDays(1),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        //        };
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        //        var token = tokenHandler.WriteToken(securityToken);
        //        return new ObjectResult(new { token });
        //    }
        //    else
        //    {
        //        return Forbidden()           
        //            }
        //}
        public async Task<ObjectResult> ChangePassword(ChangePasswordResourceModel userToUpdate)
        {
            var user = await FindUserByUserName(userToUpdate.Username);
          
            try
            {
                var newPassword = _userManager.PasswordHasher.HashPassword(user, userToUpdate.Password);
                user.PasswordHash = newPassword;
                var result = await _userManager.UpdateAsync(user);
                return new ObjectResult(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public async Task<IEnumerable<UserResourceModel>> GetUsers()
        {

           var listOfResourceModel = new List<UserResourceModel>();

           var listOfUser = await _dbContext.Users.OrderBy(p => p.UserName).ToListAsync();
            foreach (var item in listOfUser)
            {

                var role = await _userManager.GetRolesAsync(item);
                listOfResourceModel.Add(new UserResourceModel
                {
                    Id = item.Id,
                    UserName = item.UserName,
                    Role = role.FirstOrDefault()
                });
            }
           return listOfResourceModel;
        }


        public async Task<bool> CheckPassword(LoginResourceModel model)
        {
            var user = await FindUserByUserName(model.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<IdentityUser> FindUserByUserName(string name)
        {
            return await _userManager.FindByNameAsync(name);
        }
        public async Task<ObjectResult> GenerateToken(IdentityUser user)
        {
            var role = await _userManager.GetRolesAsync(user);
            IdentityOptions _options = new IdentityOptions();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
                        new Claim("UserID",user.Id.ToString()),
                       new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
              }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return new ObjectResult(new { token });
        }

    }
   
}
