namespace TaskApi.Models
{

     public enum Status
     {
         TODO,
         IN_PROGRESS,
         DONE
     }
      public enum Priority
     {
         LOW,
         MEDIUM,
         HIGH
     }
    
    public class TaskJob
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Status Status { get; set; } = Status.TODO;
        public Priority Priority { get; set; } = Priority.MEDIUM;
        public int? AssigneeId { get; set; }
        public int CreatorId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
