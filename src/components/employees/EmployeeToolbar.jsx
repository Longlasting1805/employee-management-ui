import { FaPlus, FaFileCsv } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import { exportEmployees } from "../../services/employeeService";

function EmployeeToolbar({
                             search,
                             onSearchChange,
                             searching,
                         }) {
    const navigate = useNavigate();

    const handleExport = async () => {
        try {
            const blob = await exportEmployees();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "employees.csv";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Unable to export employees.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Employees
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage employees in your organization
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <div>
                    <EmployeeSearch
                        value={search}
                        onChange={onSearchChange}
                    />

                    {searching && (
                        <p className="text-sm text-gray-500 mt-1">
                            Searching...
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleExport}
                    className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-5 py-3 rounded-lg transition"
                >
                    <FaFileCsv />
                    Export CSV
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/employees/new")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
                >
                    <FaPlus />
                    Add Employee
                </button>
            </div>
        </div>
    );
}

export default EmployeeToolbar;