using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


using Microsoft.AspNetCore.Mvc;

namespace CRS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
       // private readonly IUserService _userService;
       //// private ApplicationDbContext context;
       // public ValuesController(ApplicationDbContext context, IUserService userService)
       // {
       //     _userService = userService;
       //     this.context = context;
       // }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
          //  var reno = _userService.GetUsers();
          // var value= context.ApplicationUsers.Where(p => p.Id == "1").Select(p => p.UserName).ToString();
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
