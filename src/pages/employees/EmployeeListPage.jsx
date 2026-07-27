import { useEffect, useState } from "react";
import EmployeeToolbar from "../../components/employees/EmployeeToolbar";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmptyState from "../../components/employees/EmptyState";
import {
    getEmployees,
    searchEmployees,
} from "../../services/employeeService";

function EmployeeListPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

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

    const searchForEmployees = async () => {
        try {
            setSearching(true);

            const data = await searchEmployees(search);

            setEmployees(data.content);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Search failed.");
        } finally {
            setSearching(false);
        }
    };

    const handleDelete = (id) => {

        setEmployees((prev) =>
            prev.filter(
                (employee) => employee.id !== id
            )
        );

    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.trim()) {
                searchForEmployees();
            } else {
                fetchEmployees();
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    if (loading) {
        return (
            <div className="text-center mt-10 text-lg">
                Loading employees...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div>
            <EmployeeToolbar
                search={search}
                onSearchChange={(e) => setSearch(e.target.value)}
                searching={searching}
            />

            {
                employees.length === 0 ? (

                    <EmptyState />

                ) : (

                    <EmployeeTable
                        employees={employees}
                        onDelete={handleDelete}
                    />

                )
            }
        </div>
    );
}

export default EmployeeListPage;