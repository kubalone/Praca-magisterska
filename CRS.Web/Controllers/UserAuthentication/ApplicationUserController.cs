﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CRS.Data.Users.AplicationSetting;
using CRS.Data.Users.ResourceModel;
using CRS.Service.UserAuthentication.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CRS.Web.Controllers.UserAuthentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly IUserService _userService;
        UserManager<IdentityUser> _userManager;
        private readonly JWTSettings _jwtSettings;
        public ApplicationUserController(IUserService userService, UserManager<IdentityUser> userManager, IOptions<JWTSettings> jwtSettings)
        {
            _userService = userService;
            _userManager=userManager;
            _jwtSettings = jwtSettings.Value;
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> InsertNewUser(RegisterResourceModel registerResourceModel)
        {
           return await _userService.Register(registerResourceModel);
        }
        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<Object> Login(LoginResourceModel model)
        {

            return await _userService.Login(model);     
        }
        [HttpGet]
        [Authorize]
        [Route("GetUser")]
        //GET : /api/ApplicationUser/GetUser
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.UserName
            };
        }
        [HttpGet]
        //[Authorize(Roles = "Admin")]
        [Route("GetUsers")]
        public async Task<IEnumerable<IdentityUser>> GetUsers()
        {
            return await _userService.GetUsers();
        }
    }
}