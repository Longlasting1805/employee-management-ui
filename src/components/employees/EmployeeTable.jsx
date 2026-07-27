import EmployeeRow from "./EmployeeRow";

function EmployeeTable({
                           employees,
                           onDelete,
                       }) {

    return (

        <table className="min-w-full">

            <thead className="bg-slate-100">

            <tr>

                <th className="px-6 py-4 text-left">
                    Name
                </th>

                <th className="px-6 py-4 text-left">
                    Email
                </th>

                <th className="px-6 py-4 text-left">
                    Phone
                </th>

                <th className="px-6 py-4 text-left">
                    Created
                </th>

                <th className="px-6 py-4 text-left">
                    Actions
                </th>

            </tr>

            </thead>

            <tbody>

            {employees.map((employee) => (

                <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    onDelete={onDelete}
                />

            ))}

            </tbody>

        </table>

    );

}

export default EmployeeTable;