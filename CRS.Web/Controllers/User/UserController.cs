using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Data.Entities;
using CRS.Service.DTO;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
    
        public UserController(IUserService userService)
        {
            _userService = userService;
     
        }


        [HttpGet]

        [Route("GetUsers")]
        //POST : /api/User/GetUsers
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {

            return Ok(await _userService.GetUsers());

        }
        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(AuthenticationDto userDataToLogin)
        {

            return Ok(await _userService.Login(userDataToLogin));
        }

        [HttpPost]
        [Route("Register")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Register(AuthenticationDto userDataToRegister)
        {

            return Ok(await _userService.Register(userDataToRegister));
        }
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        //POST: /api/ApplicationUser/DeleteUser
        public async Task<IActionResult> Delete(string id)
        {

            return Ok(await _userService.Delete(id));
        }
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(AuthenticationDto userToUpdate)
        {
            return Ok(await _userService.ChangePassword(userToUpdate));
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword()
        {
            var resetPasswordDto = await _userService.GetPasswordResetTokenForUser();
            var callbackUrl = Url.Action("ResetPassword", "User", new { userId = resetPasswordDto.Id, token = resetPasswordDto.Token }, protocol: HttpContext.Request.Scheme);
            return Ok(await _userService.SendEmail(resetPasswordDto.Email, callbackUrl));
        }

        [HttpGet]
        [Authorize]
        [Route("GetUser")]
        //GET : /api/User/GetUser
        public async Task<ActionResult<object>> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var userName = await _userService.FindUserNameById(userId);
            return new
            {
                userName
            };
        }
        [HttpGet("[action]")]
        [AllowAnonymous]
        public IActionResult ResetPassword(string userId, string token)
        {
            return RedirectToAction("ResetPassword", "Notification", new { userId, token });
        }
    }
}