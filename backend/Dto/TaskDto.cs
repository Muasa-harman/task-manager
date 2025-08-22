using System.ComponentModel.DataAnnotations;
using TaskApi.Models;

namespace TaskApi.DTOs
{
    public class TaskDto
    {
        [Required]
        [StringLength(100)]
        public required string Title { get; set; }

        [StringLength(500)]
        public required string Description { get; set; }

        [Required]
        [EnumDataType(typeof(Status))]
        public Status Status { get; set; } = Status.TODO;
    }
}
