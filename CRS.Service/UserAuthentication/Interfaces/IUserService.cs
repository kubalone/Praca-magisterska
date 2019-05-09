using CRS.Data.Users.ResourceModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.UserAuthentication.Interfaces
{
    public interface IUserService
    {
     Task<ObjectResult> Register(RegisterResourceModel model);
    // Task<ObjectResult> Login(LoginResourceModel model);
     Task<IEnumerable<UserResourceModel>> GetUsers();
     Task<ObjectResult> Delete(string id);
     Task<ObjectResult> ChangePassword(ChangePasswordResourceModel userToUpdate);
     Task<bool> CheckPassword(LoginResourceModel model);
    Task<ObjectResult> GenerateToken(IdentityUser user);
    Task<IdentityUser> FindUserByUserName(string name);



    }
}
