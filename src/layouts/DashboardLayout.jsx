import { Outlet, NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUsers,
    FaPlus,
    FaSignOutAlt,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";

function DashboardLayout() {
    return (
        <div className="min-h-screen flex bg-slate-100">

            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">

                <div className="p-6 border-b border-slate-700">
                    <h1 className="text-2xl font-bold">
                        EmployeeMS
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <FaTachometerAlt />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/employees"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <FaUsers />
                        Employees
                    </NavLink>

                    <NavLink
                        to="/employees/new"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-slate-800"
                            }`
                        }
                    >
                        <FaPlus />
                        Add Employee
                    </NavLink>

                </nav>

                <div className="p-4 border-t border-slate-700">

                    <button
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">

                <Navbar />

                <Outlet />

            </main>

        </div>
    );
}

export default DashboardLayout;