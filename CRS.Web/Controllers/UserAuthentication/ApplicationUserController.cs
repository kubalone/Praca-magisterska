using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Data.Users.ResourceModel;
using CRS.Service.UserAuthentication.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.UserAuthentication
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly IUserService _userService;
        public ApplicationUserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> InserNewUser(RegisterResourceModel registerResourceModel)
        {
           return await _userService.Register(registerResourceModel);
        }
    }
}