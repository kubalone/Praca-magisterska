using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using CRS.Data.Entities;
using CRS.Data.Users.AplicationSetting;
using CRS.Data.Users.ResourceModel;
using CRS.Service.DTO;

using CRS.Service.Interfaces;

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
        //private readonly IUserService _userService;
        //UserManager<IdentityUser> _userManager;
        //private readonly JWTSettings _jwtSettings;
        ////IEmailSender emailSender
        ////private readonly IEmailSender _emailSender;
        //public ApplicationUserController(IUserService userService, UserManager<IdentityUser> userManager, IOptions<JWTSettings> jwtSettings)
        //{
        //    _userService = userService;
        //    _userManager = userManager;
        //    _jwtSettings = jwtSettings.Value;
        //   // _emailSender = emailSender;
        //}

     



      
        //[HttpGet]
        //[Route("ForgotPassword")]
        //public async Task<IActionResult> ForgotPassword()
        //{
        //    var user = await _userService.FindUserByUserName("Admin");
        //    if (user == null || user.Email == null)
        //    {
        //        return NotFound();
        //    }

        //    var code = await _userService.GeneratePasswordResetToken(user);
        //    var callbackUrl = Url.Action("ResetPassword", "ApplicationUser", new { userId = user.Id, code }, protocol: HttpContext.Request.Scheme);


        //    try
        //    {
        //        var result = await _emailSender.SendEmailAsync("renoamareno1@o2.pl", "Resetowanie hasła", "Aby zresetować hasło kliknij w podany <a href=\"" + callbackUrl + "\">link</a>");
        //        return new ObjectResult(result);

        //    }
        //    catch (Exception)
        //    {

        //        return StatusCode(500, "Internal server error");
        //    }

        //}
        //[HttpGet("[action]")]
        //[AllowAnonymous]
        //public IActionResult ResetPassword(string userId, string code)
        //{
        //    return RedirectToAction("ResetPassword", "Notification", new { userId, code });
        //}
    }
}