import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SelectButton from '../components/SelectButton';
import Pagination from '../components/Pagination';
import ConfirmDelete from '../components/ConfirmDelete';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import MembershipPackageModal from '../components/MembershipPackageModal';
const MembershipDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentPackageID, setCurrentPackageID] = useState('');
    const [membershipPackages, setMembershipPackages] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMembershipPackages = async () => {
        setLoading(true);
        try {
            const response = await api.get("/membership-packages", {
                params: { page, size, search, sortBy, order },
            });
            setMembershipPackages(response.data.packages);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchMembershipPackages();
        }, 500);

        return () => clearTimeout(delay);
    }, [page, size, search, sortBy, order]);
    // Handle Search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleOpenDeleteModal = (value) => {
        setIsDeleteModalOpen(true);
        setCurrentPackageID(value)
    };

    // Function to open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Function to handle form submission
    const handleCreateMembershipPackage = async (formData) => {
        try {
            await api.post("/membership-packages", formData);
            toast.success("Package created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            fetchMembershipPackages();
        }
    };

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/membership-packages/${currentPackageID}`);
            toast.success(response.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            fetchMembershipPackages();
            setIsDeleteModalOpen(false);
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
                    <button
                        type="button"
                        onClick={openModal}
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-lg md:w-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        <svg
                            className="h-5 w-5 mr-2 -ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add Package
                    </button>
                    <SelectButton
                        id="languages"
                        label="Sort by"
                        defaultOption="--"
                        options={[
                            { value: "date", label: "Date" },
                            { value: "name", label: "Name" },
                            { value: "price", label: "Price" },

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
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Post Limit</th>
                            <th scope="col" className="px-6 py-3">Child Limit</th>
                            <th scope="col" className="px-6 py-3">Duration</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Is Active</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            membershipPackages.map((membershipPackage) => (
                                <tr
                                    key={membershipPackage._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >

                                    <td className="px-6 py-4">
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{membershipPackage.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{membershipPackage.postLimit}</td>
                                    <td className="px-6 py-4">{membershipPackage.updateChildDataLimit}</td>
                                    <td className="px-6 py-4">
                                        {membershipPackage.duration.value} {membershipPackage.duration.unit}
                                    </td>
                                    <td className="px-6 py-4">
                                        {membershipPackage.price.value} {membershipPackage.price.unit}
                                    </td>
                                    <td className="px-6 py-4">
                                        {membershipPackage.isDeleted ? (
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2" /> Deactive
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" /> Active
                                            </div>
                                        )}

                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="font-medium"
                                            onClick={() => handleOpenDeleteModal(membershipPackage._id)}
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
                onConfirm={handleDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this package?"
            />
            <MembershipPackageModal isOpen={isModalOpen} onClose={() => closeModal()} onSubmitForm={handleCreateMembershipPackage} />
        </div>
    );
};

export default MembershipDashboard;