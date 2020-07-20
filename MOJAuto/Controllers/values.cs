using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MOJAuto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class values : ControllerBase
    {
        public values()
        {

        }

        public IActionResult GetValues()
        {
            var arr =  new string[] { "value1", "value2", "value3", "value4", "value5" };

            return Ok(arr);
        }
    }
}
