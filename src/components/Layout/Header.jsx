import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [childrenMenuOpen, setChildrenMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext); // Get user from context

    const childMenuRef = useRef(null);
    const childMenuButtonRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleChildrenMenu = (e) => {
        e.preventDefault();
        setChildrenMenuOpen(!childrenMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleLogout = () => {
        logout(); // Use the logout function from context
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Handle child menu click outside
            if (childrenMenuOpen &&
                childMenuRef.current &&
                !childMenuRef.current.contains(event.target) &&
                childMenuButtonRef.current &&
                !childMenuButtonRef.current.contains(event.target)) {
                setChildrenMenuOpen(false);
            }

            // Handle profile dropdown click outside
            if (profileDropdownOpen &&
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target) &&
                profileButtonRef.current &&
                !profileButtonRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [childrenMenuOpen, profileDropdownOpen]);

    // For debugging - log when header renders
    console.log("Header rendering, user:", user);

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center">
                                <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
                                <span className="ml-2 text-xl font-bold text-gray-800">Child Growth Tracker</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Home
                            </Link>

                            {/* Children dropdown */}
                            <div className="relative">
                                <button
                                    ref={childMenuButtonRef}
                                    onClick={toggleChildrenMenu}
                                    className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium focus:outline-none"
                                >
                                    Children
                                    <svg className="ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {childrenMenuOpen && (
                                    <div
                                        ref={childMenuRef}
                                        className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5"
                                    >
                                        <Link to="/children" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            View All Children
                                        </Link>
                                        <Link to="/children/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Add New Child
                                        </Link>
                                        <Link to="/children/growth-data" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Growth Data
                                        </Link>
                                        <Link to="/children/charts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Growth Charts
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link to="/plans" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Plans
                            </Link>

                            <Link to="/resources" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Resources
                            </Link>

                            <Link to="/contact" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Contact
                            </Link>
                        </div>

                        {/* Profile dropdown */}
                        {user ? (
                            <div className="ml-3 relative">
                                <button
                                    ref={profileButtonRef}
                                    onClick={toggleProfileDropdown}
                                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>

                                {profileDropdownOpen && (
                                    <div
                                        ref={profileDropdownRef}
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                    >
                                        <div className="py-1">
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Profile
                                            </Link>
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="ml-3 flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {/* Rest of the mobile menu code unchanged */}
        </header>
    );
};

export default Header;