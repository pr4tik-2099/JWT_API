using JWT_API.DTO;
using JWT_API.Models;
using JWT_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly AuthService services;
        private readonly StudentDbContext context;
        private readonly IConfiguration config;

        public AuthController(IConfiguration config,StudentDbContext context)
        {
           // this.services = service;
            this.config = config;
            this.context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User?>> RegisterAsync(UserDTO users)
        {
            if (await context.Users.AnyAsync(u => u.UserName == users.UserName))
                return BadRequest("User Already Exist");

            User newUser = new User();

            newUser.UserName = users.UserName;
            newUser.Password = new PasswordHasher<User>().HashPassword(newUser, users.Password);
            await context.Users.AddAsync(newUser);
            await context.SaveChangesAsync();
            return Ok(newUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDTO users)
        {
            User? user = await context.Users.FirstOrDefaultAsync(u => u.UserName == users.UserName);
            if (user == null)
            {
                return BadRequest("UserName incorrect");
            }
            else if (new PasswordHasher<User>().VerifyHashedPassword(user, user.Password, users.Password!) == PasswordVerificationResult.Failed)
            {
                return BadRequest("Password Incorrect");
            }
            string token = CreateToken(user);
            //return Ok(token);
            return Ok(new {Token=token});
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("JWTSettings:Token")!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDeceptor = new JwtSecurityToken(
                issuer: config.GetValue<string>("JWTSettings:Issuer"),
                audience: config.GetValue<string>("JWTSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDeceptor);
        }

        //Checking Authorization of JWT Token
        [HttpGet("Auth-point")]
        [Authorize]
        public async Task<ActionResult> AuthCheck()
        {
            var result = await context.Marks.ToListAsync();
            return Ok(new { Data=result });
        }
    }
}
