import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import EmployeeGrowthChart from "../../components/dashboard/EmployeeGrowthChart";
import RecentEmployees from "../../components/dashboard/RecentEmployees";

import {
    FaUsers,
    FaCalendarDay,
    FaCalendarAlt,
    FaUserPlus,
    FaPlus,
    FaFileExport,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { getDashboardStats } from "../../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getDashboardStats();

                setStats(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        loadDashboard();

    }, []);

    if (loading) {

        return (

            <div className="text-center mt-20 text-lg">

                Loading dashboard...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome back! Here's an overview of your system.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    icon={<FaUsers />}
                    title="Total Employees"
                    value={stats.totalEmployees}
                />

                <StatCard
                    icon={<FaCalendarDay />}
                    title="Added Today"
                    value={stats.employeesToday}
                />

                <StatCard
                    icon={<FaCalendarAlt />}
                    title="Added This Month"
                    value={stats.employeesThisMonth}
                />

                <StatCard
                    icon={<FaUserPlus />}
                    title="Newest Employee"
                    value={stats.newestEmployee}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="xl:col-span-2">

                    <EmployeeGrowthChart
                        data={stats.monthlyRegistrations}
                    />

                </div>

                <RecentEmployees
                    employees={stats.recentEmployees}
                />

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-xl font-semibold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-4">

                    <Link
                        to="/employees/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                    >
                        <FaPlus />
                        Add Employee
                    </Link>

                    <Link
                        to="/employees"
                        className="border px-6 py-3 rounded-lg hover:bg-gray-100"
                    >
                        View Employees
                    </Link>

                    <button
                        className="border px-6 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                    >
                        <FaFileExport />
                        Export CSV
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DashboardPage;