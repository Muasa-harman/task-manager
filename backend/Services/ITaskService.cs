using TaskApi.Models;

namespace TaskApi.Services
{
    public interface ITaskService
    {
        ServiceResponse<List<TaskJob>> GetAllTasks();
        ServiceResponse<List<TaskJob>> GetTasks(string? status, int? assigneeId);
        ServiceResponse<TaskJob?> GetTaskById(int id);
        ServiceResponse<TaskJob> CreateTask(TaskJob newTask);
        ServiceResponse<TaskJob?> UpdateTask(int id, TaskJob updatedTask);
        ServiceResponse<bool> DeleteTask(int id);
    }
}
