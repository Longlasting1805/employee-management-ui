import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteEmployee } from "../../services/employeeService";
import ConfirmModal from "../common/ConfirmModal";

function EmployeeRow({
                         employee,
                         onDelete,
                     }) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {

        try {

            setLoading(true);

            await deleteEmployee(employee.id);

            toast.success(
                "Employee deleted successfully!"
            );

            onDelete(employee.id);

            setShowModal(false);

        } catch (err) {

            console.error(err);

            toast.error(
                "Unable to delete employee."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <>

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
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                        Delete
                    </button>

                </td>

            </tr>

            <ConfirmModal
                isOpen={showModal}
                title="Delete Employee"
                message={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                loading={loading}
                onCancel={() => setShowModal(false)}
                onConfirm={handleDelete}
            />

        </>
    );

}

export default EmployeeRow;