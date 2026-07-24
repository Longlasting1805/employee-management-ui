import StatCard from "../../components/dashboard/StatCard";

function DashboardPage() {
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <StatCard
                    title="Total Employees"
                    value="0"
                />

                <StatCard
                    title="Administrators"
                    value="1"
                />

                <StatCard
                    title="Departments"
                    value="0"
                />

            </div>

        </div>
    );
}

export default DashboardPage;