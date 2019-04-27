using CRS.Data.Users.ResourceModel;
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
    
    
    }
}
