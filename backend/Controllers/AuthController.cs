using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Services;
using TaskApi.DTOs;
using Microsoft.AspNetCore.Authorization;

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

        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult Register(RegisterDto dto)
        {
            var result = _userService.Register(dto);
            if (!result.Success) return BadRequest(new {success = false, message = result.Message});
            return Ok(new { success = true, Message="User registered successfully"});
        }
        [AllowAnonymous]
        [HttpPost("signin")]
        public IActionResult Login(LoginDto dto)
        {
            var result = _userService.Login(dto);
            if (!result.Success) return Unauthorized(new {success =false, message = result.Message});
            return Ok(new {success = true, token = result.Data.Token, user = result.Data.User});
        }
    }
}
