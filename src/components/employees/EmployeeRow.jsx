import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../services/employeeService";

function EmployeeRow({
                         employee,
                         onDelete,
                     }) {

    const navigate = useNavigate();

    const handleDelete = async () => {

        const confirmed = window.confirm(
            `Delete ${employee.firstName} ${employee.lastName}?`
        );

        if (!confirmed) return;

        try {

            await deleteEmployee(employee.id);

            onDelete(employee.id);

        } catch (err) {

            console.error(err);

            alert("Unable to delete employee.");

        }

    };

    return (

        <tr className="border-b">

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

            <td className="px-6 py-4 flex gap-2">

                <button
                    onClick={() =>
                        navigate(`/employees/edit/${employee.id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

            </td>

        </tr>

    );
}

export default EmployeeRow;