import React, { useState } from 'react';
import DOMPurify from "dompurify"
import ConfirmDelete from './ConfirmDelete';
import api from '../utils/api';
import { toast } from 'react-toastify';
const PostModal = ({ isOpen, onClose, content, tittle, postId, fetchPosts }) => {
    if (!isOpen) return null;

    const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: "", status: "" });

    const handleConfirm = async () => {
        try {
            const response = await api.put(`/posts/status/${postId}?status=${confirmModal.status}`);
            toast.success(response.data.message);

            // Fetch lại danh sách bài viết sau khi cập nhật thành công
            await fetchPosts();
        } catch (error) {
            console.error("Error updating post status:", error);
            toast.error(error.response?.data?.message || "Failed to update post status.");
        } finally {
            setConfirmModal({ isOpen: false, type: "", status: "" });
            onClose();
        }
    };

    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div className="fixed bg-neutral-800/50 top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 h-screen">
            <div className="relative w-full max-w-4xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            {tittle}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                    </div>

                    <div className="flex items-center p-4 md:p-5 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={() => setConfirmModal({ isOpen: true, type: "confirm", status: "PUBLISHED" })}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Publish
                        </button>
                        <button
                            onClick={() => setConfirmModal({ isOpen: true, status: "REJECTED" })}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmDelete
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, type: "", status: "" })}
                onConfirm={handleConfirm}
                title={confirmModal.status === "PUBLISHED" ? "Confirm Publish" : "Confirm Rejection"}
                message={`Are you sure you want to ${confirmModal.status === "PUBLISHED" ? "publish" : "reject"} this post?`}
                type={confirmModal.type}
            />
        </div>
    );
};
export default PostModal;
