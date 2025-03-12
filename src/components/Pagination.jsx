import React, { useState, useEffect } from 'react';

const Pagination = ({
  initialPage = 1,
  totalPages = 5,
  onPageChange = () => {},
  size = 'md' // 'sm' or 'md'
}) => {
  // Sử dụng state nội bộ để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Cập nhật state nội bộ khi prop initialPage thay đổi
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Tạo mảng các số trang
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Xác định kích thước dựa trên prop size
  const sizeClasses = {
    sm: {
      height: 'h-8',
      text: 'text-sm',
      padding: 'px-3',
      icon: 'w-2.5 h-2.5'
    },
    md: {
      height: 'h-10',
      text: 'text-base',
      padding: 'px-4',
      icon: 'w-3 h-3'
    }
  };

  const {height, text, padding, icon} = sizeClasses[size] || sizeClasses.md;

  // Xử lý khi click vào trang
  const handlePageClick = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber); // Cập nhật state nội bộ
      onPageChange(pageNumber); // Thông báo component cha
    }
  };

  // Xử lý khi click nút Previous
  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage); // Cập nhật state nội bộ
      onPageChange(newPage); // Thông báo component cha
    }
  };

  // Xử lý khi click nút Next
  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage); // Cập nhật state nội bộ
      onPageChange(newPage); // Thông báo component cha
    }
  };

  return (
    <nav aria-label="Page navigation" className='flex justify-center pt-5'>
      <ul className={`flex items-center -space-x-px ${height} ${text}`}>
        {/* Previous button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center ${padding} ${height} ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="sr-only">Previous</span>
            <svg className={`${icon} rtl:rotate-180`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePageClick(pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={`flex items-center justify-center ${padding} ${height} leading-tight ${
                pageNumber === currentPage
                  ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next button */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center ${padding} ${height} leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="sr-only">Next</span>
            <svg className={`${icon} rtl:rotate-180`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;