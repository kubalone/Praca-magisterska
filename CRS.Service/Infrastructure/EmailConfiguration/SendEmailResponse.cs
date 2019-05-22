using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.Infrastructure.EmailConfiguration
{
    public class SendEmailResponse
    {
        public bool Successful => ErrorMsg == null;

        public string ErrorMsg { get; set; }
    }
}
