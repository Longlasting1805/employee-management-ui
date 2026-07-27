import EmployeeRow from "./EmployeeRow";
import {
    FaSort,
    FaSortUp,
    FaSortDown,
} from "react-icons/fa";

function EmployeeTable({
                           employees,
                           onDelete,
                           sortBy,
                           direction,
                           onSort,
                       }) {

    const getIcon = (field) => {

        if (sortBy !== field) {

            return <FaSort className="inline ml-2 text-gray-400" />;

        }

        return direction === "asc"

            ? <FaSortUp className="inline ml-2 text-blue-600" />

            : <FaSortDown className="inline ml-2 text-blue-600" />;

    };

    return (

        <table className="min-w-full">

            <thead className="bg-slate-100">

            <tr>

                <th
                    onClick={() => onSort("firstName")}
                    className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200 transition"
                >
                    Name

                    {getIcon("firstName")}

                </th>

                <th
                    onClick={() => onSort("email")}
                    className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200 transition"
                >
                    Email

                    {getIcon("email")}

                </th>

                <th className="px-6 py-4 text-left">

                    Phone

                </th>

                <th
                    onClick={() => onSort("createdAt")}
                    className="px-6 py-4 text-left cursor-pointer hover:bg-slate-200 transition"
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

            {

                employees.map((employee) => (

                    <EmployeeRow
                        key={employee.id}
                        employee={employee}
                        onDelete={onDelete}
                    />

                ))

            }

            </tbody>

        </table>

    );

}

export default EmployeeTable;