// components/layout/Sidebar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FiHome, FiTrendingUp, FiClock, FiStar,
    FiHeart, FiSettings, FiMenu, FiBell, FiSearch, FiUser
} from 'react-icons/fi';
import ProfileDropdown from '../ProfileDropdown';

const Sidebar = ({
    currentPage, setCurrentPage, activeTab, setActiveTab, onToggleSidebar,
    isLoggedIn, onOpenAuthModal, isProfileDropdownOpen, onToggleProfileDropdown, onLogout
}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [showTopSearchBar, setShowTopSearchBar] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        {
            id: 1,
            type: 'new_release',
            title: 'New Release: Kalvan',
            message: 'Now available to watch!',
            time: '5 min ago',
            image: '/images/Kalvan.jpg',
            unread: true
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Watch Reminder',
            message: 'Continue watching "Family Star" - Episode 3',
            time: '1 hour ago',
            image: '/images/Family Star.jpg',
            unread: true
        },
        {
            id: 3,
            type: 'new_release',
            title: 'New Episodes Available',
            message: 'Stranger Things Season 5 - 3 new episodes',
            time: '2 hours ago',
            image: '/images/Stranger Things.jpg',
            unread: true
        },
        {
            id: 4,
            type: 'reminder',
            title: 'Watch Reminder',
            message: 'You added "Bhool Bhulaiyaa" to your watchlist',
            time: '5 hours ago',
            image: '/images/Bhool Bhulaiyaa.jpg',
            unread: false
        },
        {
            id: 5,
            type: 'recommendation',
            title: 'Recommended for You',
            message: 'Based on your watch history: Premalu',
            time: '1 day ago',
            image: '/images/Premalu.jpg',
            unread: false
        },
        {
            id: 6,
            type: 'new_release',
            title: 'Coming Soon',
            message: 'Bagheera - Releasing tomorrow!',
            time: '1 day ago',
            image: '/images/Bagheera.jpg',
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const pageToRoute = {
        'Home': '/',
        'TV Series': '/tv-series',
        'Movies': '/movies',
        'Animes': '/animes',
        'Trends': '/trends',
        'Coming Soon': '/coming-soon',
        'Rated Movies': '/rated-movies',
        'Fan Favourite': '/fan-favourite',
        'Settings': '/settings',
        'Profile': '/profile',
    };

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggleSidebar(newState);
    };

    const handleNavigation = (pageName) => {
        const route = pageToRoute[pageName];
        if (route) {
            navigate(route);
            if (window.innerWidth < 1024) {
                toggleSidebar();
            }
        }
    };

    const menuItems = [
        { name: 'Home', icon: FiHome },
        { name: 'Trends', icon: FiTrendingUp },
        { name: 'Coming Soon', icon: FiClock },
        { name: 'Rated Movies', icon: FiStar },
        { name: 'Fan Favourite', icon: FiHeart },
    ];

    const generalItems = [
        { name: 'Settings', icon: FiSettings },
    ];

    const renderNavSection = (title, items) => (
        <div className="mb-6 md:mb-8">
            <h3 className="text-gray-500 text-xs uppercase font-semibold mb-2 md:mb-3 tracking-widest">
                {title}
            </h3>
            <nav>
                {items.map((item) => {
                    const isActive = item.name === currentPage;
                    return (
                        <button
                            key={item.name}
                            onClick={(e) => { 
                                e.preventDefault(); 
                                handleNavigation(item.name);
                            }}
                            className={`w-full flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-xl transition-colors duration-200 relative text-sm md:text-base
                                ${isActive
                                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium shadow-lg shadow-amber-900/50'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}
                            `}
                        >
                            {isActive && (
                                <span className="absolute right-0 w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-l-lg"></span>
                            )}
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* TOP BAR */}
            <div className="bg-gray-800 text-white antialiased flex items-center justify-between px-4 md:px-6 py-3 fixed top-0 left-0 right-0 z-40 h-14 md:h-16">
                {/* Left: Menu + Logo */}
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="mr-2 md:mr-4 hover:text-amber-500" aria-label="Toggle navigation">
                        <FiMenu className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <Link
                        to="/"
                        onClick={() => setActiveTab('TV Series')}
                     className="text-xl md:text-2xl font-extrabold tracking-tight whitespace-nowrap 
                           focus:outline-none rounded-sm cursor-pointer"
                        aria-label="Go to dashboard"
                    >
                        <span className="text-white">MO</span>
                        <span className="text-amber-600">FI</span>
                    </Link>
                </div>

                {/* Center: Tabs - hidden on mobile */}
                <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm lg:text-lg font-medium">
                    {['TV Series', 'Movies', 'Animes'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                handleNavigation(tab);
                                setActiveTab(tab);
                            }}
                            className={`pb-1 transition whitespace-nowrap ${
                                currentPage === tab
                                    ? 'text-amber-500 border-b-2 border-amber-500 font-semibold'
                                    : 'text-gray-400 hover:text-amber-400'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right: Icons / Auth */}
                <div className="flex items-center space-x-3 md:space-x-6 relative">
                    <FiSearch
                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => setShowTopSearchBar(prev => !prev)}
                    />
                    {showTopSearchBar && (
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="absolute right-0 top-12 md:top-14 bg-gray-700 text-white rounded-lg px-4 py-2 w-[70vw] max-w-[16rem] md:w-64 border border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm transition-all"
                            autoFocus
                        />
                    )}
                    
                    {/* Notification Bell */}
                    <div className="relative hidden sm:block">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative"
                        >
                            <FiBell className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer transition" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-12 md:top-14 w-80 md:w-96 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 max-h-[32rem] overflow-hidden z-50">
                                {/* Header */}
                                <div className="p-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-gray-800">
                                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                                    <button 
                                        onClick={() => setShowNotifications(false)}
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Notifications List */}
                                <div className="overflow-y-auto max-h-[28rem]">
                                    {notifications.map((notification) => (
                                        <div 
                                            key={notification.id}
                                            className={`p-4 border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition ${
                                                notification.unread ? 'bg-gray-700/30' : ''
                                            }`}
                                        >
                                            <div className="flex gap-3">
                                                {/* Notification Image */}
                                                <div className="flex-shrink-0">
                                                    <img 
                                                        src={notification.image} 
                                                        alt={notification.title}
                                                        className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
                                                    />
                                                </div>

                                                {/* Notification Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="text-sm font-semibold text-white truncate">
                                                            {notification.title}
                                                        </h4>
                                                        {notification.unread && (
                                                            <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-1"></div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className="p-3 border-t border-gray-700 bg-gray-800">
                                    <button className="w-full text-center text-sm text-amber-600 hover:text-amber-500 font-semibold transition">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        {!isLoggedIn ? (
                            <button
                                onClick={onOpenAuthModal}
                                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-1 px-3 md:px-4 rounded-full text-sm whitespace-nowrap shadow-lg shadow-amber-900/50 hover:shadow-xl transition-all"
                            >
                                Sign In
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={onToggleProfileDropdown}
                                    className="block rounded-full overflow-hidden w-8 h-8 md:w-9 md:h-9 border-2 border-gray-600 hover:border-amber-500 transition-colors"
                                >
                                    <FiUser className="w-full h-full p-1 bg-gray-700" />
                                </button>
                                {isProfileDropdownOpen && (
                                    <ProfileDropdown
                                        handleLogout={onLogout}
                                        setCurrentPage={setCurrentPage}
                                        onClose={onToggleProfileDropdown}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
                    onClick={toggleSidebar}
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col p-4 md:p-6 h-screen w-64 md:w-72 lg:w-64
                fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out
                pt-16 md:pt-20 overflow-y-auto shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Mobile Navigation Tabs */}
                <div className="md:hidden mb-6 pb-4 border-b border-gray-700">
                    <h3 className="text-gray-500 text-xs uppercase font-semibold mb-3 tracking-widest">Browse</h3>
                    <div className="space-y-1">
                        {['TV Series', 'Movies', 'Animes'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    handleNavigation(tab);
                                    setActiveTab(tab);
                                    toggleSidebar(); // Close sidebar after selection
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                                    currentPage === tab
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                {renderNavSection('MENU', menuItems)}
                {renderNavSection('GENERAL', generalItems)}
            </div>
        </>
    );
};

export default Sidebar;
