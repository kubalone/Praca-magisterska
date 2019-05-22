using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.Infrastructure
{
    public class JWTSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
    }
}
