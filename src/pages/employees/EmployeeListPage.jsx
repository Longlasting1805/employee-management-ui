import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const data = await getEmployees();

            setEmployees(data.content);

            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load employees.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading employees...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Employees
            </h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">

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

                    </tr>

                    </thead>

                    <tbody>

                    {employees.map((employee) => (

                        <tr
                            key={employee.id}
                            className="border-t"
                        >

                            <td className="px-6 py-4">

                                {employee.firstName} {employee.lastName}

                            </td>

                            <td className="px-6 py-4">

                                {employee.email}

                            </td>

                            <td className="px-6 py-4">

                                {employee.phoneNumber}

                            </td>

                            <td className="px-6 py-4">

                                {new Date(employee.createdAt).toLocaleDateString()}

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default EmployeeListPage;