import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    createEmployee,
    updateEmployee,
    getEmployeeById,
} from "../../services/employeeService";

function EmployeeForm({
                          mode = "create",
                          employeeId,
                      }) {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });

    useEffect(() => {

        if (mode !== "edit") return;

        const loadEmployee = async () => {

            try {

                const data = await getEmployeeById(employeeId);

                setEmployee({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                });

            } catch (err) {

                console.error(err);

            }

        };

        loadEmployee();

    }, [mode, employeeId]);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setErrors({});

            if (mode === "create") {

                await createEmployee(employee);

            } else {

                await updateEmployee(
                    employeeId,
                    employee
                );

            }

            navigate("/employees");
        } catch (err) {
            console.error(err);

            // Backend validation errors
            if (
                err.response &&
                err.response.data &&
                typeof err.response.data === "object"
            ) {
                setErrors(err.response.data);
            } else {
                setErrors({
                    general: "Unable to create employee.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-8">
                {mode === "create"
                    ? "Add Employee"
                    : "Edit Employee"}
            </h1>

            {errors.general && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                    {errors.general}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                <div>

                    <label className="block font-medium mb-2">
                        First Name
                    </label>

                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.firstName}
                        </p>
                    )}

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Last Name
                    </label>

                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.lastName}
                        </p>
                    )}

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.email}
                        </p>
                    )}

                </div>

                <div>

                    <label className="block font-medium mb-2">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        name="phoneNumber"
                        value={employee.phoneNumber}
                        onChange={handleChange}
                        placeholder="08012345678"
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.phoneNumber}
                        </p>
                    )}

                </div>

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        {
                            loading
                                ? "Saving..."
                                : mode === "create"
                                    ? "Save Employee"
                                    : "Update Employee"
                        }
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="border px-6 py-3 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EmployeeForm;