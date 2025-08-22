using System.ComponentModel.DataAnnotations;

namespace TaskApi.Services
{
    public class ServiceResponse<T>
    {
        public bool Success { get; set; }
        [Required]
        public required string Message { get; set; }
        public T Data { get; set; } = default!;
    }

}
