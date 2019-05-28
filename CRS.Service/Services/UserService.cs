using AutoMapper;
using CRS.Data.Entities;
using CRS.Repository;
using CRS.Repository.Data;
using CRS.Service.DTO;
using CRS.Service.Exceptions;
using CRS.Service.Infrastructure;
using CRS.Service.Interfaces;
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

namespace CRS.Service.Services
{

    public class UserService : Repository<ApplicationUser>, IUserService
    {
      
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly JWTSettings _jwtSettings;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        public UserService(CRSDbContext repositoryContext, IMapper mapper, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<JWTSettings> jwtSettings, IEmailSender emailSender) 
            : base(repositoryContext)
        {
            _mapper = mapper;
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var applicationUsers = await GetAll()
                .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .OrderBy(p => p.UserName)
                .ToListAsync();

            var usersDto = _mapper.Map<List<UserDto>>(applicationUsers);

            return usersDto;
        }

        public async Task<ObjectResult> Login(AuthenticationDto userDataToLogin)
        {
            var user = await _userManager.FindByNameAsync(userDataToLogin.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user, userDataToLogin.Password))
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
                throw new BadRequestException();


        }
        public async Task<ObjectResult> Register(AuthenticationDto userDataToRegister)
        {
            var aplicationUser = new ApplicationUser
            {
                UserName = userDataToRegister.UserName,
            };
            var result=await _userManager.CreateAsync(aplicationUser, userDataToRegister.Password);
            await _userManager.AddToRoleAsync(aplicationUser, "Pracownik");
            return new ObjectResult(result);

        }

        public async Task Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                throw new NotFoundException("user to delete");
            }

           await _userManager.DeleteAsync(user);
           

        }

        public async Task ChangePassword(AuthenticationDto userToUpdate)
        {
            var user = await _userManager.FindByNameAsync(userToUpdate.UserName);
            if (user==null)
            {
                throw new NotFoundException("User to update");
            }
            var newPassword = _userManager.PasswordHasher.HashPassword(user, userToUpdate.Password);
            user.PasswordHash = newPassword;
             await _userManager.UpdateAsync(user);
           
        }
      

        public async Task<ResetPasswordDto> GetPasswordResetTokenForUser()
        {
            var user = await _userManager.FindByNameAsync("Admin");
            if (user == null || user.Email == null)
            {
                throw new NotFoundException("Admin");
            }

            var token =  await _userManager.GeneratePasswordResetTokenAsync(user);
            var passwordResetTokenDto = new ResetPasswordDto()
            {
                Id=user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Token = token
            };
            return passwordResetTokenDto;
        }

        public async Task<ObjectResult> SendEmail(string email, string callbackUrl)
        {
            var result = await _emailSender.SendEmailAsync("renoamareno1@o2.pl", "Resetowanie hasła", "Aby zresetować hasło kliknij w podany <a href=\"" + callbackUrl + "\">link</a>");
            return new ObjectResult(result);
        }

        public async Task ResetPasswordComfirmation(string id, string code, string password)
        {
            var user = await _userManager.FindByIdAsync(id);
            await _userManager.ResetPasswordAsync(user, code, password);
        }
        public async Task<string> FindUserNameById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return user.UserName;
        }
    }
}













