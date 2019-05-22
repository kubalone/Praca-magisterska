using System;
using System.Collections.Generic;
using System.Text;

namespace CRS.Service.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(string name)
           : base($"Entity {name} was not found.")
        {

        }
    }
}

