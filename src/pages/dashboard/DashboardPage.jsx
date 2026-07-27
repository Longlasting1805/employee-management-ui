import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";

import {
    FaUsers,
    FaCalendarDay,
    FaCalendarAlt,
    FaUserPlus,
} from "react-icons/fa";

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

        <div>

            <div className="mb-8">

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

        </div>

    );

}

export default DashboardPage;