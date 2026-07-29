import { useState, useRef, useEffect } from "react";
import {
    FaBell,
    FaBars,
    FaChevronDown,
    FaUser,
    FaKey,
    FaSignOutAlt,
    FaCheckDouble,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function Navbar({ onMenuClick }) {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [profileOpen, setProfileOpen] = useState(false);

    const [notificationOpen, setNotificationOpen] = useState(false);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Welcome back 👋",
            description: "You're successfully logged in.",
            read: false,
        },
        {
            id: 2,
            title: "System Ready",
            description: "Employee Management System is running.",
            read: false,
        },
        {
            id: 3,
            title: "Tip",
            description: "Remember to export your employees regularly.",
            read: true,
        },
    ]);

    const profileRef = useRef(null);

    const notificationRef = useRef(null);

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setNotificationOpen(false);
            }

        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

    }, []);

    const unreadCount = notifications.filter(
        n => !n.read
    ).length;

    const markAllAsRead = () => {

        setNotifications(prev =>
            prev.map(notification => ({
                ...notification,
                read: true,
            }))
        );

        toast.success("Notifications marked as read.");

    };

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully.");

        navigate("/");

    };

    const goToProfile = () => {

        setProfileOpen(false);

        navigate("/profile");

    };

    const goToChangePassword = () => {

        setProfileOpen(false);

        navigate("/change-password");

    };

    const displayName = user?.email
        ? user.email.split("@")[0]
        : "Administrator";

    const initials = displayName
        .substring(0, 2)
        .toUpperCase();

    return (

        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-4">

                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-2xl text-slate-700"
                >
                    <FaBars />
                </button>

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h2>

                    <p className="text-gray-500">
                        Welcome back, {displayName} 👋
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-6">

                {/* Notifications */}

                <div
                    className="relative"
                    ref={notificationRef}
                >

                    <button
                        onClick={() =>
                            setNotificationOpen(!notificationOpen)
                        }
                        className="relative text-gray-600 hover:text-blue-600 transition"
                    >

                        <FaBell size={20} />

                        {
                            unreadCount > 0 && (

                                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">

                                    {unreadCount}

                                </span>

                            )
                        }

                    </button>

                    {

                        notificationOpen && (

                            <div className="absolute right-0 mt-4 w-96 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">

                                <div className="flex items-center justify-between p-4 border-b">

                                    <h3 className="font-semibold">
                                        Notifications
                                    </h3>

                                    <button
                                        onClick={markAllAsRead}
                                        className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                                    >

                                        <FaCheckDouble />

                                        Mark all

                                    </button>

                                </div>

                                {

                                    notifications.length === 0 ? (

                                        <div className="p-8 text-center text-gray-500">

                                            No notifications.

                                        </div>

                                    ) : (

                                        notifications.map(notification => (

                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b last:border-none hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""
                                                }`}
                                            >

                                                <p className="font-medium">

                                                    {notification.title}

                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">

                                                    {notification.description}

                                                </p>

                                            </div>

                                        ))

                                    )

                                }

                            </div>

                        )

                    }

                </div>

                {/* Profile */}

                <div
                    className="relative"
                    ref={profileRef}
                >

                    <button
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                        className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                    >

                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                            {initials}

                        </div>

                        <div className="hidden md:block text-left">

                            <p className="font-semibold">

                                {displayName}

                            </p>

                            <p className="text-sm text-gray-500">

                                {user?.role}

                            </p>

                        </div>

                        <FaChevronDown />

                    </button>

                    {

                        profileOpen && (

                            <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">

                                <button
                                    onClick={goToProfile}
                                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
                                >

                                    <FaUser />

                                    Profile

                                </button>

                                <button
                                    onClick={goToChangePassword}
                                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
                                >

                                    <FaKey />

                                    Change Password

                                </button>

                                <hr />

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
                                >

                                    <FaSignOutAlt />

                                    Logout

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </header>

    );

}

export default Navbar;