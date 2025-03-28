import React from "react";

function ConfirmDelete({ isOpen, onClose, onConfirm, title, message, type }) {
  if (!isOpen) return null;
  // Định nghĩa màu sắc dựa trên type
  const buttonColors = {
    delete: "bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800",
    confirm: "bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-800",
  };

  const buttonColor = buttonColors[type] || buttonColors.delete; // Mặc định là delete nếu type không hợp lệ

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </button>

        <div className="p-4 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
          <button
            onClick={onConfirm}
            className={`text-white ${buttonColor} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onClose}
            className="ml-3 py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDelete;
