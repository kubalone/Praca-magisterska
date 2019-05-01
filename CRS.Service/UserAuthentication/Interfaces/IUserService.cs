using CRS.Data.Users.ResourceModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.UserAuthentication.Interfaces
{
    public interface IUserService
    {
     Task<Object> Register(RegisterResourceModel model);
     Task<Object> Login(LoginResourceModel model);
     Task<IEnumerable<IdentityUser>> GetUsers();



    }
}
