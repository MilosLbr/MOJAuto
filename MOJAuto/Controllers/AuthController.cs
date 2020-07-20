using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MOJAuto.Models;

namespace MOJAuto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            string email = loginUserDto.Email;
            string password = loginUserDto.Password;

            var user = await _userManager.FindByNameAsync(email);

            if(user == null)
            {
                return BadRequest("Invalid username or password!");
            }

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, password, false);

            if (result.Succeeded)
            {
                
                return Ok();
            }

            return Unauthorized();
        }
    }
}
