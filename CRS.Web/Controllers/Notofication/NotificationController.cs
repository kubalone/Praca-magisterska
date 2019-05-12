using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers.Notofication
{
    public class NotificationController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public NotificationController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult ResetPassword(string userId, string code)
        {
   
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> ResetPasswordConfirmation(string userId, string code, string password)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ResetPasswordAsync(user, code, password);
            return View();
        }


    }
}