using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DTOs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MOJAuto.Models;

namespace MOJAuto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration config, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("LoginUser")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            string userName = loginUserDto.UserName;
            string password = loginUserDto.Password;

            var user = await _userManager.FindByNameAsync(userName);

            if(user == null)
            {
                return BadRequest("Pogrešno korisničko ime ili lozinka!");
            }

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, password, false);

            if (result.Succeeded)
            {
                var token = GenerateJSONWebToken(user);
                return Ok(new { token });
            }

            return Unauthorized();
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var userToCreate = _mapper.Map<ApplicationUser>(registerUserDto);

            var result = await _userManager.CreateAsync(userToCreate, registerUserDto.Password);


            if (result.Succeeded)
            {
                return Ok("Registered!");
            }

            return BadRequest(result.Errors);
        }
        private string GenerateJSONWebToken(ApplicationUser userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, userInfo.UserName)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddDays(1),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
