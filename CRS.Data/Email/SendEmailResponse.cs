using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Data.Email
{
    public class SendEmailResponse
    {
        public bool Successful => ErrorMsg == null;

        public string ErrorMsg { get; set; }
    }
}
