using TaskApi.DTOs;

namespace TaskApi.Services
{
    public interface IUserService
    {
        ServiceResponse<RegisterResponseDto> Register(RegisterDto dto);
        ServiceResponse<LoginResponseDto> Login(LoginDto dto);
    }
}
