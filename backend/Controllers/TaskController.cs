using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using TaskApi.Services;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        
        }
        [HttpGet("tasks")]
        public IActionResult GetAll()
        {
            var tasks = _taskService.GetAllTasks();
            return Ok(tasks);
        }

        // GET: api/task/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var task = _taskService.GetTaskById(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        // POST: api/task
        [HttpPost]
        public IActionResult Create(TaskJob newTask)
        {
            var task = _taskService.CreateTask(newTask);
            return CreatedAtAction(nameof(GetById), new { id = task.Data.Id }, task);
        }

        // PUT: api/task/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, TaskJob updatedTask)
        {
            var task = _taskService.UpdateTask(id, updatedTask);
            if (task == null) return NotFound(task?.Message);
            return Ok(task);
        }

        // DELETE: api/task/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _taskService.DeleteTask(id);
            if (!result.Success) return NotFound(result.Message);
            return NoContent();
        }
    }
}
