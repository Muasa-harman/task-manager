using TaskApi.Data;
using TaskApi.Models;
using System.Linq;

namespace TaskApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public ServiceResponse<List<TaskJob>> GetAllTasks()
        {
            return new ServiceResponse<List<TaskJob>>
            {
                Success = true,
                Message = "Tasks retrieved successfully",
                Data = _context.Tasks.ToList()
            };
        }

        public ServiceResponse<List<TaskJob>> GetTasks(string? status, int? assigneeId)
        {
            var query = _context.Tasks.AsQueryable();

            if (!string.IsNullOrWhiteSpace(status) &&
                Enum.TryParse<Status>(status, true, out var parsed))
            {
                query = query.Where(t => t.Status == parsed);
            }

            if (assigneeId.HasValue)
            {
                query = query.Where(t => t.AssigneeId == assigneeId.Value);
            }

            return new ServiceResponse<List<TaskJob>>
            {
                Success = true,
                Data = query.ToList(),
                Message = "Tasks retrieved successfully"
            };
        }

        public ServiceResponse<TaskJob?> GetTaskById(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return new ServiceResponse<TaskJob?> { Success = false, Message = "Task not found" };

            return new ServiceResponse<TaskJob?>
            {
                Success = true,
                Message = "Task retrieved successfully",
                Data = task
            };
        }

        public ServiceResponse<TaskJob> CreateTask(TaskJob newTask)
        {
            _context.Tasks.Add(newTask);
            _context.SaveChanges();
            return new ServiceResponse<TaskJob>
            {
                Success = true,
                Message = "Task created successfully",
                Data = newTask };
        }

        public ServiceResponse<TaskJob?> UpdateTask(int id, TaskJob updatedTask)
        {
            var existing = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (existing == null)
                return new ServiceResponse<TaskJob?> { Success = false, Message = "Task not found" };

            existing.Title = updatedTask.Title;
            existing.Description = updatedTask.Description;
            existing.Status = updatedTask.Status;
            existing.Priority = updatedTask.Priority;
            existing.AssigneeId = updatedTask.AssigneeId;
            existing.UpdatedAt = DateTime.Now;

            _context.SaveChanges();

            return new ServiceResponse<TaskJob?>
            {
                Success = true,
                Message = "Task updated successfully",
                Data = existing };
        }

        public ServiceResponse<bool> DeleteTask(int id)
        {
            var existing = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (existing == null)
                return new ServiceResponse<bool> { Success = false, Message = "Task not found", Data = false };

            _context.Tasks.Remove(existing);
            _context.SaveChanges();

            return new ServiceResponse<bool> { Success = true, Message = "Task deleted successfully", Data = true };
        }
    }
}
