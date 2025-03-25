import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SelectButton from '../components/SelectButton';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import RatingStars from '../components/RatingStars';
import DefaultAvatar from '../assets/DefaultAvatar.svg';
import ConfirmDelete from '../components/ConfirmDelete';
import { toast } from 'react-toastify';
function ConsultationsDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consultations, setConsultations] = useState([]);
    const [currentUser, setCurrentUser] = useState([])
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);


    const fetchConsultations = async () => {
        setLoading(true);
        try {
            const response = await api.get("/consultations", {
                params: { page, size, search, sortBy, order },
            });
            setConsultations(response.data.consultations);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchConsultations();
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
            fetchConsultations();
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

                            <th scope="col" className="px-6 py-3">Member</th>
                            <th scope="col" className="px-6 py-3">Doctor</th>
                            <th scope="col" className="px-6 py-3">Rating</th>
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
                            consultations.map((consultation) => (
                                <tr
                                    key={consultation._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{consultation.requestDetails.member.name}</td>

                                    <td className="px-6 py-4">{consultation.requestDetails.doctor.name}</td>

                                    <td className="px-6 py-4"><RatingStars rating={consultation.rating}></RatingStars></td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {consultation.status === "Ongoing" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> Ended
                                                </>
                                            )}
                                            {consultation.status === "Ended" && (
                                                <>
                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" /> Ongoing
                                                </>
                                            )}

                                        </div>

                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            View Detail
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

        </div>
    );
};

export default ConsultationsDashboard