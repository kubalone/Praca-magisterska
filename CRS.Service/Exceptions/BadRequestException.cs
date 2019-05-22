using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.Exceptions
{
    public class BadRequestException: Exception
    {
        public BadRequestException()
            : base($"Request could not be undestood by the server")
        {

        }
    }
}
