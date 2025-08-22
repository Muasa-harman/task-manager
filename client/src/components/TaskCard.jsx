import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "./Modal";


const DashTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Fix login bug",
      description: "Users cannot log in with Google OAuth.",
      status: "IN_PROGRESS",
      priority: "HIGH",
      assigneeId: 2,
      creatorId: 1,
      createdAt: "2025-08-20T10:00:00Z",
      updatedAt: "2025-08-21T14:30:00Z",
    },
    {
      id: "2",
      title: "Update landing page",
      description: "Add new marketing banner for August campaign.",
      status: "TODO",
      priority: "MEDIUM",
      assigneeId: null,
      creatorId: 3,
      createdAt: "2025-08-18T09:00:00Z",
      updatedAt: "2025-08-19T11:15:00Z",
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);

  const handleEditSave = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? { ...editingTask, updatedAt: new Date() } : t
      )
    );
    setEditingTask(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  return (
    <div className="p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskTable">
          {(provided) => (
            <table
              className="w-full shadow-md rounded-lg overflow-hidden"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">TITLE</th>
                  <th className="px-4 py-2">DESCRIPTION</th>
                  <th className="px-4 py-2">STATUS</th>
                  <th className="px-4 py-2">PRIORITY</th>
                  <th className="px-4 py-2">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="bg-white dark:bg-gray-800 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-4 py-2">{task.id}</td>
                        <td className="px-4 py-2 font-medium">{task.title}</td>
                        <td className="px-4 py-2">{task.description}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              task.status === "TODO"
                                ? "bg-gray-500"
                                : task.status === "IN_PROGRESS"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              task.priority === "LOW"
                                ? "bg-green-500"
                                : task.priority === "MEDIUM"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            onClick={() => setEditingTask({ ...task })}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
        {editingTask && (
          <div>
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={editingTask.status}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, status: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <select
                value={editingTask.priority}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, priority: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashTasks;

