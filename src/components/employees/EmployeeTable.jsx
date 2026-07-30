import { useNavigate } from "react-router-dom";
import {
    FaSort,
    FaSortUp,
    FaSortDown,
} from "react-icons/fa";

import EmployeeRow from "./EmployeeRow";

function EmployeeTable({
                           employees,
                           onDelete,
                           sortBy,
                           direction,
                           onSort,
                       }) {

    const navigate = useNavigate();

    const getIcon = (field) => {

        if (sortBy !== field) {

            return (
                <FaSort className="inline ml-2 text-gray-400" />
            );

        }

        return direction === "asc"

            ? <FaSortUp className="inline ml-2 text-blue-600" />

            : <FaSortDown className="inline ml-2 text-blue-600" />;

    };

    return (

        <>

            {/* Desktop */}

            <div className="hidden lg:block bg-white rounded-xl shadow overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-100">

                    <tr>

                        <th
                            onClick={() => onSort("firstName")}
                            className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200"
                        >
                            Name
                            {getIcon("firstName")}
                        </th>

                        <th
                            onClick={() => onSort("email")}
                            className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200"
                        >
                            Email
                            {getIcon("email")}
                        </th>

                        <th className="px-6 py-4 text-left">
                            Phone
                        </th>

                        <th
                            onClick={() => onSort("createdAt")}
                            className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200"
                        >
                            Created
                            {getIcon("createdAt")}
                        </th>

                        <th className="px-6 py-4 text-left">
                            Actions
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {employees.map(employee => (

                        <EmployeeRow
                            key={employee.id}
                            employee={employee}
                            onDelete={onDelete}
                        />

                    ))}

                    </tbody>

                </table>

            </div>

            {/* Mobile */}

            <div className="lg:hidden space-y-4">

                {employees.map(employee => (

                    <div
                        key={employee.id}
                        className="bg-white rounded-xl shadow p-5"
                    >

                        <h3 className="font-bold text-lg">

                            {employee.firstName} {employee.lastName}

                        </h3>

                        <p className="text-gray-500 mt-1">

                            {employee.email}

                        </p>

                        <div className="mt-4 space-y-2">

                            <p>

                                <span className="font-semibold">
                                    Phone:
                                </span>{" "}

                                {employee.phoneNumber}

                            </p>

                            <p>

                                <span className="font-semibold">
                                    Created:
                                </span>{" "}

                                {new Date(employee.createdAt).toLocaleDateString()}

                            </p>

                        </div>

                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={() =>
                                    navigate(`/employees/edit/${employee.id}`)
                                }
                                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(employee.id)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </>

    );

}

export default EmployeeTable;