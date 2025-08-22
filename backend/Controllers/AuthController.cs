using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Services;
using TaskApi.DTOs;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var result = _userService.Register(dto);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var result = _userService.Login(dto);
            if (!result.Success) return Unauthorized(result.Message);
            return Ok(result);
        }
    }
}
