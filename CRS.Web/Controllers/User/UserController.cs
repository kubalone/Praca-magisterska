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
        private UserManager<ApplicationUser> _userManager;
        public UserController(IUserService userService, UserManager<ApplicationUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;

        }


        [HttpGet]
        [Route("GetUsers")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {

            return Ok(await _userService.GetUsers());

        }
        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<ActionResult> Login(AuthenticationDto userDataToLogin)
        {

            return await _userService.Login(userDataToLogin);
        }

        [HttpPost]
        [Route("Register")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Register(AuthenticationDto userDataToRegister)
        {

            return await _userService.Register(userDataToRegister);
        }
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Delete(string id)
        {
            await _userService.Delete(id);
            return Ok();
        }
        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(AuthenticationDto userToUpdate)
        {
            await _userService.ChangePassword(userToUpdate);
            return Ok();
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
        public async Task<ActionResult> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var userName = await _userService.FindUserNameById(userId);
            return new ObjectResult (new { userName });


        }
        [HttpGet("[action]")]
        [AllowAnonymous]
        public IActionResult ResetPassword(string userId, string token)
        {
            return RedirectToAction("ResetPassword", "Notification", new { userId, token });
        }
    }
}