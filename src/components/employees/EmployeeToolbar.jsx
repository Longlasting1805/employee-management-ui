import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import EmployeeSearch from "./EmployeeSearch";

function EmployeeToolbar({
                             search,
                             onSearchChange,
                             searching,
                         }) {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between mb-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Employees
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage employees in your organization
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="flex flex-col">

                    <EmployeeSearch
                        value={search}
                        onChange={onSearchChange}
                    />

                    {searching && (
                        <span className="text-sm text-gray-500 mt-1">
                            Searching...
                        </span>
                    )}

                </div>

                <button
                    onClick={() => navigate("/employees/new")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
                >
                    <FaPlus />
                    Add Employee
                </button>

            </div>

        </div>
    );
}

export default EmployeeToolbar;