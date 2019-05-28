using CRS.Data.Entities;
using CRS.Repository;
using CRS.Service.DTO;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface IUserService: IRepository<ApplicationUser>
    {

        Task<IEnumerable<UserDto>> GetUsers();
        Task<ObjectResult> Login(AuthenticationDto userDataToLogin);
        Task<ObjectResult> Register(AuthenticationDto userDataToRegister);
        Task Delete(string id);
        Task ChangePassword(AuthenticationDto userToUpdate);
        Task<ResetPasswordDto> GetPasswordResetTokenForUser();
        Task<ObjectResult> SendEmail(string email, string callbackUrl);
        Task ResetPasswordComfirmation(string id, string code, string password);
        Task<string> FindUserNameById(string id);

    }
}
