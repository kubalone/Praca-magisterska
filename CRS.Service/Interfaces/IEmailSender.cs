using CRS.Service.Infrastructure.EmailConfiguration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.Interfaces
{
    public interface IEmailSender
    {
        Task<SendEmailResponse> SendEmailAsync(string userEmail, string emailSubject, string message);
    }
}
