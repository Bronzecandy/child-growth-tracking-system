import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SelectButton from '../components/SelectButton';
import Pagination from '../components/Pagination';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ReceiptTable = () => {
    const [receipts, setReceipts] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchReceipts = async () => {
        setLoading(true);
        try {
            const response = await api.get("/receipts", {
                params: { page, size, search, sortBy, order },
            });
            setReceipts(response.data.receipts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách hóa đơn:", error);
            toast.error("Không thể tải danh sách hóa đơn");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchReceipts();
        }, 500);

        return () => clearTimeout(delay);
    }, [page, size, search, sortBy, order]);

    // Handle Search
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page) => {
        setPage(page);
    }

    const handleOrderByChange = (value) => {
        setOrder(value);
    }

    const handleSortByChange = (value) => {
        setSortBy(value);
    }

    return (
        <div className="">
            {/* Table header with search and filter */}
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div className='flex gap-5'>
                    <SelectButton
                        id="sortBy"
                        label="Sort by"
                        defaultOption="--"
                        options={[
                            { value: "date", label: "Date" },
                        ]}
                        onChange={handleSortByChange}
                    />
                    <SelectButton
                        id="orderBy"
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
                        id="table-search-receipts"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for receipts"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Receipts table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Customer Name</th>
                            <th scope="col" className="px-6 py-3">Package</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Payment Gateway</th>
                            <th scope="col" className="px-6 py-3">Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            receipts.map((receipt) => (
                                <tr
                                    key={receipt._id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    
                                    <td className="px-6 py-4">{receipt.user?.name}</td>
                                    <td className="px-6 py-4">{receipt.membershippackage?.name}</td>
                                    <td className="px-6 py-4">{receipt.totalAmount.value} {receipt.totalAmount.currency}</td>
                                    <td className="px-6 py-4">{new Date(receipt.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {receipt.paymentGateway}
                                    </td>
                                    <td className="px-6 py-4">{receipt.paymentMethod}</td>
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
        </div>
    );
};

export default ReceiptTable;