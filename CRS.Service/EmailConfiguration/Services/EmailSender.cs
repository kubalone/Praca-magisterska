using CRS.Data.Email;
using CRS.Data.Users.AplicationSetting;
using CRS.Service.EmailConfiguration.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRS.Service.EmailConfiguration.Services
{
    public class EmailSender: IEmailSender
    {
        private readonly AuthMessageSenderOptions _authMessageSenderOptions;
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            _authMessageSenderOptions = optionsAccessor.Value;
        }

        public async Task<SendEmailResponse> SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var apiKey = _authMessageSenderOptions.SendGridKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("kubalone@gmail.com", "CarService.com");
            var subject = emailSubject;
            var to = new EmailAddress(userEmail, "Test");
            var plainTextContent = message;
            var htmlContent = message;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return new SendEmailResponse();
        }
    

    }
}
