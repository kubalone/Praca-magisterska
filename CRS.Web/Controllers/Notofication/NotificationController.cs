using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRS.Data.Entities;
using CRS.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Notofication
{
    public class NotificationController : Controller
    {
        private readonly IUserService _userService;
        public NotificationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string userId, string token)
        {
  
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPasswordConfirmation(string userId, string token, string password)
        {
            await _userService.ResetPasswordComfirmation(userId, token, password);
            return View();
        }


    }
}