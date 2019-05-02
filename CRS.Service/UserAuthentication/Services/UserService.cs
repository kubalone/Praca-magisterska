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

        public async Task<Object> Register(RegisterResourceModel model)
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
        public async Task<Object> Login(LoginResourceModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
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
            else
            {
                return new ObjectResult(new { message = "Podane hasło jest nieprawidłowe." });

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
    }
}
//FirstName=model.FirstName,
//LastName=model.LastName,
//City=model.City,
//TelephoneNumber=model.TelephoneNumber,
//PostalCode=model.PostalCode,
//Street=model.Street,
//HouseNumber=model.HouseNumber,
//ApartmentNumber=model.ApartmentNumber