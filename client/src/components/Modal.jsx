import React from "react";

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
export default Modal;
