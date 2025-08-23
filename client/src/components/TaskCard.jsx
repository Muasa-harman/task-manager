// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Modal from "./Modal";

// const DashTasks = () => {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Fix login bug",
//       description: "Users cannot log in with Google OAuth.",
//       status: "IN_PROGRESS",
//       priority: "HIGH",
//       assigneeId: 2,
//       assigneeName: "Sarah Johnson",
//       creatorId: 1,
//       creatorName: "Alex Chen",
//       createdAt: "2025-08-20T10:00:00Z",
//       updatedAt: "2025-08-21T14:30:00Z",
//     },
//     {
//       id: "2",
//       title: "Update landing page",
//       description: "Add new marketing banner for August campaign.",
//       status: "TODO",
//       priority: "MEDIUM",
//       assigneeId: null,
//       assigneeName: null,
//       creatorId: 3,
//       creatorName: "Michael Rodriguez",
//       createdAt: "2025-08-18T09:00:00Z",
//       updatedAt: "2025-08-19T11:15:00Z",
//     },
//   ]);

//   const [editingTask, setEditingTask] = useState(null);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [newTask, setNewTask] = useState({
//     title: "",
//     description: "",
//     status: "TODO",
//     priority: "MEDIUM",
//     assigneeId: null,
//   });

//   const handleEditSave = () => {
//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === editingTask.id ? { ...editingTask, updatedAt: new Date().toISOString() } : t
//       )
//     );
//     setEditingTask(null);
//   };

//   const handleCreateSave = () => {
//     const task = {
//       ...newTask,
//       id: String(tasks.length + 1),
//       creatorId: 1,
//       creatorName: "Current User",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
    
//     setTasks([...tasks, task]);
//     setIsCreateModalOpen(false);
//     setNewTask({
//       title: "",
//       description: "",
//       status: "TODO",
//       priority: "MEDIUM",
//       assigneeId: null,
//     });
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(tasks);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setTasks(reordered);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "TODO": return "📋";
//       case "IN_PROGRESS": return "🔄";
//       case "DONE": return "✅";
//       default: return "";
//     }
//   };

//   const getPriorityIcon = (priority) => {
//     switch (priority) {
//       case "LOW": return "⬇️";
//       case "MEDIUM": return "↔️";
//       case "HIGH": return "⬆️";
//       default: return "";
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50  min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Dashboard</h1>
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//           </svg>
//           Create Task
//         </button>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="taskTable">
//             {(provided) => (
//               <table
//                 className="w-full"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//                 <thead className="bg-gray-50 dark:bg-gray-700">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assignee</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Updated</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {tasks.map((task, index) => (
//                     <Draggable
//                       key={task.id}
//                       draggableId={task.id.toString()}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <tr
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                           className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                         >
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
//                                 <span className="text-blue-600 dark:text-blue-300 font-medium">T{task.id}</span>
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
//                                 <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{task.description}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === "TODO" ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200" : task.status === "IN_PROGRESS" ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100" : "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"}`}>
//                               <span className="mr-1">{getStatusIcon(task.status)}</span>
//                               {task.status.replace("_", " ")}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.priority === "LOW" ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100" : task.priority === "MEDIUM" ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100" : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"}`}>
//                               <span className="mr-1">{getPriorityIcon(task.priority)}</span>
//                               {task.priority}
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center">
//                               <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium text-sm mr-2">
//                                 {task.assigneeName ? task.assigneeName.charAt(0) : "?"}
//                               </div>
//                               <div className="text-sm text-gray-900 dark:text-white">{task.assigneeName || "Unassigned"}</div>
//                             </div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
//                             {new Date(task.updatedAt).toLocaleDateString()}
//                             <div className="text-xs">{new Date(task.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
//                           </td>
//                           <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
//                             <div className="flex space-x-2">
//                               <button
//                                 onClick={() => setEditingTask({ ...task })}
//                                 className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 p-1 rounded"
//                               >
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                 </svg>
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </tbody>
//               </table>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>

//       {/* Edit Task Modal */}
//       <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
//         {editingTask && (
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Task</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
//                 <input
//                   type="text"
//                   value={editingTask.title}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, title: e.target.value })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
//                 <textarea
//                   value={editingTask.description}
//                   onChange={(e) =>
//                     setEditingTask({
//                       ...editingTask,
//                       description: e.target.value,
//                     })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                   rows="3"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
//                 <select
//                   value={editingTask.status}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, status: e.target.value })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 >
//                   <option value="TODO">TODO</option>
//                   <option value="IN_PROGRESS">IN_PROGRESS</option>
//                   <option value="DONE">DONE</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
//                 <select
//                   value={editingTask.priority}
//                   onChange={(e) =>
//                     setEditingTask({ ...editingTask, priority: e.target.value })
//                   }
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 >
//                   <option value="LOW">LOW</option>
//                   <option value="MEDIUM">MEDIUM</option>
//                   <option value="HIGH">HIGH</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setEditingTask(null)}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleEditSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Create Task Modal */}
//       <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create New Task</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
//               <input
//                 type="text"
//                 value={newTask.title}
//                 onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 placeholder="Enter task title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
//               <textarea
//                 value={newTask.description}
//                 onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 rows="3"
//                 placeholder="Enter task description"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
//               <select
//                 value={newTask.status}
//                 onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value="TODO">TODO</option>
//                 <option value="IN_PROGRESS">IN_PROGRESS</option>
//                 <option value="DONE">DONE</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
//               <select
//                 value={newTask.priority}
//                 onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value="LOW">LOW</option>
//                 <option value="MEDIUM">MEDIUM</option>
//                 <option value="HIGH">HIGH</option>
//               </select>
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end space-x-3">
//             <button
//               onClick={() => setIsCreateModalOpen(false)}
//               className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleCreateSave}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//               Create Task
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default DashTasks;


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
      assigneeName: "Sarah Johnson",
      creatorId: 1,
      creatorName: "Alex Chen",
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
      assigneeName: null,
      creatorId: 3,
      creatorName: "Michael Rodriguez",
      createdAt: "2025-08-18T09:00:00Z",
      updatedAt: "2025-08-19T11:15:00Z",
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: null,
  });

  const handleEditSave = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? { ...editingTask, updatedAt: new Date().toISOString() } : t
      )
    );
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCreateSave = () => {
    const task = {
      ...newTask,
      id: String(tasks.length + 1),
      creatorId: 1,
      creatorName: "Current User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setIsCreateModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      assigneeId: null,
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setTasks(reordered);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "TODO": return "📋";
      case "IN_PROGRESS": return "🔄";
      case "DONE": return "✅";
      default: return "";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "LOW": return "⬇️";
      case "MEDIUM": return "↔️";
      case "HIGH": return "⬆️";
      default: return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Dashboard</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Create Task
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskTable">
            {(provided) => (
              <table
                className="w-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assignee</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Updated</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
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
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-blue-600 dark:text-blue-300 font-medium">T{task.id}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{task.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === "TODO" ? "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200" : task.status === "IN_PROGRESS" ? "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100" : "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"}`}>
                              <span className="mr-1">{getStatusIcon(task.status)}</span>
                              {task.status.replace("_", " ")}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.priority === "LOW" ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100" : task.priority === "MEDIUM" ? "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100" : "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100"}`}>
                              <span className="mr-1">{getPriorityIcon(task.priority)}</span>
                              {task.priority}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-medium text-sm mr-2">
                                {task.assigneeName ? task.assigneeName.charAt(0) : "?"}
                              </div>
                              <div className="text-sm text-gray-900 dark:text-white">{task.assigneeName || "Unassigned"}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(task.updatedAt).toLocaleDateString()}
                            <div className="text-xs">{new Date(task.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingTask({ ...task })}
                                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 p-1 rounded"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button 
                                className="text-red-500 hover:text-red-700 dark:hover:text-red-300 p-1 rounded"
                                onClick={() => handleDelete(task.id)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
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
      </div>

      {/* Edit Task Modal */}
      <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
        {editingTask && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, status: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select
                  value={editingTask.priority}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, priority: e.target.value })
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Task Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create New Task</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows="3"
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashTasks;


// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Modal from "./Modal";


// const DashTasks = () => {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Fix login bug",
//       description: "Users cannot log in with Google OAuth.",
//       status: "IN_PROGRESS",
//       priority: "HIGH",
//       assigneeId: 2,
//       creatorId: 1,
//       createdAt: "2025-08-20T10:00:00Z",
//       updatedAt: "2025-08-21T14:30:00Z",
//     },
//     {
//       id: "2",
//       title: "Update landing page",
//       description: "Add new marketing banner for August campaign.",
//       status: "TODO",
//       priority: "MEDIUM",
//       assigneeId: null,
//       creatorId: 3,
//       createdAt: "2025-08-18T09:00:00Z",
//       updatedAt: "2025-08-19T11:15:00Z",
//     },
//   ]);

//   const [editingTask, setEditingTask] = useState(null);

//   const handleEditSave = () => {
//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === editingTask.id ? { ...editingTask, updatedAt: new Date() } : t
//       )
//     );
//     setEditingTask(null);
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(tasks);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     setTasks(reordered);
//   };

//   return (
//     <div className="p-6">
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="taskTable">
//           {(provided) => (
//             <table
//               className="w-full shadow-md rounded-lg overflow-hidden"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               <thead>
//                 <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm">
//                   <th className="px-4 py-2">ID</th>
//                   <th className="px-4 py-2">TITLE</th>
//                   <th className="px-4 py-2">DESCRIPTION</th>
//                   <th className="px-4 py-2">STATUS</th>
//                   <th className="px-4 py-2">PRIORITY</th>
//                   <th className="px-4 py-2">ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {tasks.map((task, index) => (
//                   <Draggable
//                     key={task.id}
//                     draggableId={task.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <tr
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         ref={provided.innerRef}
//                         className="bg-white dark:bg-gray-800 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
//                       >
//                         <td className="px-4 py-2">{task.id}</td>
//                         <td className="px-4 py-2 font-medium">{task.title}</td>
//                         <td className="px-4 py-2">{task.description}</td>
//                         <td className="px-4 py-2">
//                           <span
//                             className={`px-2 py-1 rounded text-white ${
//                               task.status === "TODO"
//                                 ? "bg-gray-500"
//                                 : task.status === "IN_PROGRESS"
//                                 ? "bg-blue-500"
//                                 : "bg-green-500"
//                             }`}
//                           >
//                             {task.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-2">
//                           <span
//                             className={`px-2 py-1 rounded text-white ${
//                               task.priority === "LOW"
//                                 ? "bg-green-500"
//                                 : task.priority === "MEDIUM"
//                                 ? "bg-yellow-500"
//                                 : "bg-red-500"
//                             }`}
//                           >
//                             {task.priority}
//                           </span>
//                         </td>
//                         <td className="px-4 py-2 space-x-2">
//                           <button
//                             onClick={() => setEditingTask({ ...task })}
//                             className="text-blue-500 hover:underline"
//                           >
//                             Edit
//                           </button>
//                         </td>
//                       </tr>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </tbody>
//             </table>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {/* Modal */}
//       <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
//         {editingTask && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Edit Task</h2>
//             <div className="space-y-3">
//               <input
//                 type="text"
//                 value={editingTask.title}
//                 onChange={(e) =>
//                   setEditingTask({ ...editingTask, title: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2"
//               />
//               <textarea
//                 value={editingTask.description}
//                 onChange={(e) =>
//                   setEditingTask({
//                     ...editingTask,
//                     description: e.target.value,
//                   })
//                 }
//                 className="w-full border rounded px-3 py-2"
//               />
//               <select
//                 value={editingTask.status}
//                 onChange={(e) =>
//                   setEditingTask({ ...editingTask, status: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="TODO">TODO</option>
//                 <option value="IN_PROGRESS">IN_PROGRESS</option>
//                 <option value="DONE">DONE</option>
//               </select>
//               <select
//                 value={editingTask.priority}
//                 onChange={(e) =>
//                   setEditingTask({ ...editingTask, priority: e.target.value })
//                 }
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="LOW">LOW</option>
//                 <option value="MEDIUM">MEDIUM</option>
//                 <option value="HIGH">HIGH</option>
//               </select>
//             </div>
//             <div className="mt-4 flex justify-end space-x-2">
//               <button
//                 onClick={handleEditSave}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DashTasks;

