import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { createTask } from "../redux/task/taskSlice";

const CreateTask = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(true);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.task);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: null,
  });

  const handleCreateSave = async () => {
    dispatch(createTask(newTask))
      .unwrap()
      .then(() => {
        alert("✅ Task created successfully!");
        setNewTask({
          title: "",
          description: "",
          status: "TODO",
          priority: "MEDIUM",
          assigneeId: null,
        });
        setIsCreateModalOpen(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Create New Task
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="Enter task title"
            />
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
              rows="3"
              placeholder="Enter task description"
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTask;

