import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SelectButton from './SelectButton';
import Pagination from './Pagination';
import DefaultAvatar from '../assets/DefaultAvatar.svg';
import Loading from './Loading';
import UserModal from './UserModal';
import { toast } from 'react-toastify';
const UserTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);


    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/users", {
                params: { page, size, search, sortBy, order },
            });
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchUsers();
        }, 500);

        return () => clearTimeout(delay);
    }, [page, size, search, sortBy, order]);
    // Handle Search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Function to open modal
    const openModal = (userData) => {
        setCurrentUser(userData);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Function to handle form submission
    const handleSubmit = async (userData) => {
        try {
            const response = await api.patch(`/users/${currentUser._id}`, userData);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Lỗi cập nhật:", error);
        } finally {
            closeModal();
            fetchUsers();
        }
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
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Position</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
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
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{user._id}</td>
                                    <th
                                        scope="row"
                                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={user.avatar ? user.avatar : DefaultAvatar}
                                            alt={`${user.email} Avatar`}
                                        />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user.name}</div>
                                            <div className="font-normal text-gray-500">{user.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user.role === 0 ? "User" : "Doctor"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full me-2`}></div>
                                            {user.phoneNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="font-medium"
                                        >
                                            <svg className="w-6 h-6 text-yellow-500 dark:text-yellow-500 hover:text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
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

            {/* Edit User Modal */}
            <UserModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                onSubmit={handleSubmit}
                initialData={currentUser}
            />
        </div>
    );
};

export default UserTable;