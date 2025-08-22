// import React, { useState } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable
// } from "@hello-pangea/dnd";

// function DashTasks() {
//   const [tasks, setTasks] = useState([
//     {
//       id: "1",
//       title: "Fix login bug",
//       description: "Users cannot log in with Google OAuth.",
//       status: "IN_PROGRESS",
//       priority: "HIGH",
//       assigneeName: "Sarah Johnson",
//       updatedAt: "2025-08-21T14:30:00Z",
//     },
//     {
//       id: "2",
//       title: "Update landing page",
//       description: "Add new marketing banner for August campaign.",
//       status: "TODO",
//       priority: "MEDIUM",
//       assigneeName: null,
//       updatedAt: "2025-08-19T11:15:00Z",
//     },
//     {
//       id: "3",
//       title: "Database optimization",
//       description: "Improve query performance for user dashboard.",
//       status: "DONE",
//       priority: "HIGH",
//       assigneeName: "Jessica Williams",
//       updatedAt: "2025-08-22T09:45:00Z",
//     },
//   ]);

//   const [filter, setFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("updatedAt");

//   const handleDelete = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
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

//   const filteredTasks = tasks
//     .filter((task) => filter === "ALL" || task.status === filter)
//     .sort((a, b) => {
//       if (sortBy === "updatedAt") {
//         return new Date(b[sortBy]) - new Date(a[sortBy]);
//       }
//       return a[sortBy] > b[sortBy] ? 1 : -1;
//     });

//   // Handle drag end
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(filteredTasks);
//     const [removed] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, removed);

//     // Update state preserving original task IDs
//     setTasks((prev) => {
//       // map reordered filteredTasks to new global order
//       const ids = reordered.map((t) => t.id);
//       const newOrder = [...prev].sort(
//         (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)
//       );
//       return newOrder;
//     });
//   };

//   return (
//     <div className="bg-white dark:bg-gray-50 rounded-xl shadow-md p-6">
//       {/* --- header controls here (unchanged) --- */}

//       <div className="overflow-x-auto rounded-lg shadow">
//         <DragDropContext onDragEnd={handleDragEnd}>
//           <Droppable droppableId="tasks">
//             {(provided) => (
//               <table
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="w-full"
//               >
//                 <thead className="bg-gray-50 dark:bg-gray-700">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium">Priority</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium">Assignee</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium">Updated</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                   {filteredTasks.map((task, index) => (
//                     <Draggable key={task.id} draggableId={task.id} index={index}>
//                       {(provided, snapshot) => (
//                         <tr
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
//                             snapshot.isDragging ? "bg-blue-50 dark:bg-blue-900" : ""
//                           }`}
//                         >
//                           <td className="px-4 py-4">{task.title}</td>
//                           <td className="px-4 py-4">{getStatusIcon(task.status)} {task.status}</td>
//                           <td className="px-4 py-4">{getPriorityIcon(task.priority)} {task.priority}</td>
//                           <td className="px-4 py-4">{task.assigneeName || "Unassigned"}</td>
//                           <td className="px-4 py-4">{new Date(task.updatedAt).toLocaleDateString()}</td>
//                           <td className="px-4 py-4">
//                             <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:underline">
//                               Delete
//                             </button>
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
//     </div>
//   );
// }

// export default DashTasks;

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-96 p-6">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

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

  // Save edits
  const handleEditSave = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTask.id ? { ...editingTask, updatedAt: new Date() } : t
      )
    );
    setEditingTask(null);
  };

  // Handle drag and drop
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
                  <th className="px-4 py-3 text-left text-xs font-medium">
                    Assignee
                  </th>
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

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// // import PstModal from "./PstModal"

// export const DashPosts = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [userPosts, setUserPosts] = useState([]);
//   const [showMore,setShowMore] = useState(true);
//   const [showModal,setShowModal] = useState(false);
//   console.log(userPosts);
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
//         const data = await res.json();
//         if (res.ok) {
//           setUserPosts(data.posts);
//           if(data.length < 9){
//             setShowMore(false);
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
//     if (currentUser.isAdmin) {
//       fetchPosts();
//     }
//   }, [currentUser._id]);
//   const handleShowMore = async() =>{
//     const startIndex = userPosts.length;
//     try {
//       const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
//       const data = await res.json();
//       if(res.ok){
//         setUserPosts((prev)=>[...prev, ...data.posts]);
//         if(data.posts.length < 9){
//           setShowMore(false);
//         }
//       }
//     } catch (error) {
//       // console.log(error.message)
//     }
//   }
//   return (
//     <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//       {currentUser.isAdmin && userPosts.length > 0 ? (
//         <>
//           <table className="w-full shadow-md align-center">
//             <thead>
//               <tr className="gap-3">
//                 <th>DATE UPDATED</th>
//                 <th>POST IMAGE</th>
//                 <th>POST TITLE</th>
//                 <th>POST CATEGORY</th>
//                 <th>DELETE</th>
//                 <th>
//                   <span className="hidden md:block">EDIT</span>
//                 </th>
//               </tr>
//             </thead>
//             {userPosts.map((post, index) => (
//               <tbody key={index} className="divide-y">
//                 <tr
//                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   key={index}
//                 >
//                   <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
//                   <td key={index}>
//                     <Link to={`/post/${post.slug}`}>
//                       <img
//                         src={post.image}
//                         alt={post.title}
//                         className="w-20 h-10 object-cover bg-gray-500"
//                       />
//                     </Link>
//                   </td>
//                   <td>
//                     <Link
//                       className="font-medium text-gray-900 dark:text-white"
//                       to={`/post/${post.slug}`}
//                     >
//                       {post.title}
//                     </Link>
//                   </td>
//                   <td>
//                     <Link to={`/post/${post.slug}`}>{post.category}</Link>
//                   </td>
//                   <td>
//                     <span onClick={()=>{}} className="font-medium text-red-500 hover:underline">
//                     {/* <PstModal post={post._id}/> */}
//                     </span>
//                   </td>
//                   <td>
//                     <Link
//                       className="text-teal-500 hover:underline"
//                       to={`/update-post/${post._id}`}
//                     >
//                       <span>Edit</span>
//                     </Link>
//                   </td>
//                 </tr>
//               </tbody>
//             ))}
//           </table>
//           {showMore && (
//             <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
//           )}
//         </>
//       ) : (
//         <p>You have no posts yet!</p>
//       )}
//     </div>
//   );
// };
