using JWT_API.DTO;
using JWT_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JWT_API.Services
{
    public class AuthService
    {
        private readonly StudentDbContext context;
        private readonly IConfiguration config;

        public AuthService(IConfiguration config, StudentDbContext context)
        {
            this.config = config;
            this.context = context;
        }
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetValue<string>("JWTSettings:Token")!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var tokenDeceptor = new JwtSecurityToken(
                issuer: config.GetValue<string>("JWTSettings:Issuer"),
                audience: config.GetValue<string>("JWTSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDeceptor);
        }
    }
}
