import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaPlus,
    FaSignOutAlt,
    FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {

    const navigate = useNavigate();

    const { logout, isAdmin } = useAuth();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully.");

        navigate("/");

    };

    const closeSidebar = () => setSidebarOpen(false);

    return (

        <div className="h-screen flex bg-slate-100 overflow-hidden">

            {/* Mobile Overlay */}

            {
                sidebarOpen && (

                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    />

                )
            }

            {/* Sidebar */}

            <aside
                className={`
                    fixed lg:static
                    top-0 left-0
                    h-screen
                    w-64
                    bg-slate-900
                    text-white
                    flex
                    flex-col
                    z-50
                    transform
                    transition-transform
                    duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >

                <div className="p-6 border-b border-slate-700 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">
                        EmployeeMS
                    </h1>

                    <button
                        onClick={closeSidebar}
                        className="lg:hidden"
                    >
                        <FaTimes />
                    </button>

                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <FaTachometerAlt />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/employees"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <FaUsers />
                        Employees
                    </NavLink>

                    {
                        isAdmin && (

                            <NavLink
                                to="/employees/new"
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-600"
                                            : "hover:bg-slate-800"
                                    }`
                                }
                            >
                                <FaPlus />
                                Add Employee
                            </NavLink>

                        )
                    }

                </nav>

                <div className="p-4 border-t border-slate-700">

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </aside>

            {/* Right Side */}

            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Fixed Navbar */}

                <div className="flex-shrink-0">

                    <Navbar
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                </div>

                {/* Scrollable Content */}

                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;