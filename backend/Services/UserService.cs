using TaskApi.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TaskApi.Services
{
    public class UserService : IUserService
    {
        private readonly string _key;

        public UserService(IConfiguration config)
        {
            _key = config.GetValue<string>("Jwt:Key") ?? "secretkeyformyjwtwithatleast32chars!!";
        }

        private readonly List<(string Email, string Password, string Role)> demoUsers = new()
        {
            ("admin", "admin123", "ADMIN"),
            ("harman.muasa@gmail.com", "12345678", "USER")
        };

        public ServiceResponse<LoginResponseDto> Login(LoginDto dto)
      {
        var user = demoUsers.FirstOrDefault(u => u.Email == dto.Email && u.Password == dto.Password);
        if (user == default)
         return new ServiceResponse<LoginResponseDto>
            {
                Success = false,
                Message = "Invalid email or password"
            };

       var token = GenerateJwtToken(user.Email, user.Role);

       return new ServiceResponse<LoginResponseDto>
       {
        Success = true,
        Message = "Login successful",
        Data = new LoginResponseDto
        {
            Token = token,
            User = new LoginResponseDto.AuthUserDto
            {
                Username = user.Email,
                Role = user.Role
            }
        }
    };
}



        public ServiceResponse<RegisterResponseDto> Register(RegisterDto dto)
        {
            return new ServiceResponse<RegisterResponseDto>
            {
                Success = true,
                Message = $"User {dto.Username} registered (demo only)",
                Data = new RegisterResponseDto
                {
                    Username = dto.Username,
                    Email = dto.Email,
                    Role = "USER"
                }
            };
        }

        private string GenerateJwtToken(string username, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

   
}
