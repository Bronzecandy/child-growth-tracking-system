import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SelectButton from '../components/SelectButton';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import DefaultAvatar from '../assets/DefaultAvatar.svg';
import ConfirmDelete from '../components/ConfirmDelete';
import { toast } from 'react-toastify';
function RequestDashboard() {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteAction, setDeleteAction] = useState(null);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await api.get("/requests", {
                params: { page, size, search, sortBy, order, status: filter },
            });
            setRequests(response.data.requests);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchRequests();
        }, 500);

        return () => clearTimeout(delay);
    }, [page, size, search, sortBy, order, filter]);
    // Handle Search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.put(`/requests/status/${id}`, { status });
            toast.success(`Request ${status} successfully!`);
        } catch (error) {
            toast.error(`Failed to update request: ${error.response?.data?.message || error.message}`);
        } finally {
            fetchRequests();
            setIsDeleteModalOpen(false);
        }
    };

    const openConfirmModal = (id, action) => {
        setSelectedRequestId(action);
        setDeleteAction(() => () => handleStatusChange(id, action));
        setIsDeleteModalOpen(true);
    };


    const handlePageChange = (page) => {
        setPage(page);
    }
    const handleOrderByChange = (value) => {
        setOrder(value);
    }
    const handleSortrByChange = (value) => {
        setSortBy(value);
    }
    return (
        <div className="">
            {/* Table header with actions and search */}
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div className='flex gap-5'>
                    <SelectButton
                        id="languages"
                        label="Sort by"
                        defaultOption="--"
                        options={[
                            { value: "date", label: "Date" },

                        ]}
                        onChange={handleSortrByChange}
                    />
                    <SelectButton
                        id="languages"
                        label="Order"
                        defaultOption="--"
                        options={[
                            { value: "ascending", label: "Ascending" },
                            { value: "descending", label: "Descending" },
                        ]}
                        onChange={handleOrderByChange}
                    />
                    <SelectButton
                        id="languages"
                        label="Filter"
                        defaultOption="--"
                        options={[
                            { value: "Pending", label: "Pending" },
                            { value: "Canceled", label: "Canceled" },
                            { value: "Accepted", label: "Accepted" },
                            { value: "Rejected", label: "Rejected" },
                        ]}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for users"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Users table */}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Doctor</th>
                            <th scope="col" className="px-6 py-3">Number Child</th>
                            <th scope="col" className="px-6 py-3">Member</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            requests.map((request) => (
                                <tr
                                    key={request._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{request._id}</td>
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={request.doctor.avatar || DefaultAvatar}
                                            onError={(e) => { e.target.onerror = null; e.target.src = DefaultAvatar; }}
                                            alt={`${request.doctor.name} Avatar`}
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{request.doctor.name}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{request.children?.length || 0} children</td>
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={request.member.avatar || DefaultAvatar}
                                            onError={(e) => { e.target.onerror = null; e.target.src = DefaultAvatar; }}
                                            alt={`${request.member.name} Avatar`}
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{request.member.name}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {request.status === "Pending" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500 me-2" /> Pending
                                                </>
                                            )}
                                            {request.status === "Canceled" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" /> Cancelled
                                                </>
                                            )}
                                            {request.status === "Accepted" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> Accepted
                                                </>
                                            )}
                                            {request.status === "Rejected" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-gray-500 me-2" /> Rejected
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium"
                                            onClick={() => openConfirmModal(request._id, "Rejected")}
                                        >
                                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-500 hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                            </svg>

                                        </button>
                                        <button
                                            className="font-medium"
                                            onClick={() => openConfirmModal(request._id, "AdminApprove")}
                                        >
                                            <svg className="w-6 h-6 text-green-500 dark:text-green-500 hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>

                                        </button>
                                        <button
                                            className="font-medium"
                                            onClick={() => openConfirmModal(request._id, "Canceled")}
                                        >
                                            <svg className="w-6 h-6 text-red-500 dark:text-red-500 hover:text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
            <Pagination
                initialPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <ConfirmDelete
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={deleteAction}
                title={`Confirm ${selectedRequestId}`}
                message={`Are you sure you want to ${selectedRequestId} this request?`}
                type={selectedRequestId === "AdminApprove" ? "confirm" : "delete"}
            />

        </div>
    );
};

export default RequestDashboard