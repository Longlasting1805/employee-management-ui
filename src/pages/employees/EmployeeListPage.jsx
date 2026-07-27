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

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(5);

    const [sortBy, setSortBy] = useState("firstName");

    const [direction, setDirection] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);

    const [totalElements, setTotalElements] = useState(0);

    const fetchEmployees = async () => {

        try {

            setLoading(true);

            const data = await getEmployees(
                page,
                size,
                sortBy,
                direction
            );

            setEmployees(data.content);

            setTotalPages(data.totalPages);

            setTotalElements(data.totalElements);

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

            const data = await searchEmployees(
                search,
                page,
                size
            );

            setEmployees(data.content);

            setTotalPages(data.totalPages);

            setTotalElements(data.totalElements);

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

    const handleSort = (field) => {

        if (sortBy === field) {

            setDirection((prev) =>
                prev === "asc"
                    ? "desc"
                    : "asc"
            );

        } else {

            setSortBy(field);

            setDirection("asc");

        }

        setPage(0);

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

    },  [
        search,
        page,
        size,
        sortBy,
        direction,
    ]);

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
                onSearchChange={(e) => {

                    setSearch(e.target.value);

                    setPage(0);

                }}
                searching={searching}
            />

            {

                employees.length === 0

                    ? <EmptyState />

                    : (

                        <>

                            <EmployeeTable
                                employees={employees}
                                onDelete={handleDelete}
                                sortBy={sortBy}
                                direction={direction}
                                onSort={handleSort}
                            />

                            <div className="flex items-center justify-between mt-6">

                                <p className="text-gray-600">

                                    Showing{" "}

                                    {page * size + 1}

                                    -

                                    {Math.min(
                                        (page + 1) * size,
                                        totalElements
                                    )}

                                    {" "}of{" "}

                                    {totalElements}

                                    {" "}employees

                                </p>

                                <div className="flex items-center gap-2">

                                    <button

                                        disabled={page === 0}

                                        onClick={() =>
                                            setPage(page - 1)
                                        }

                                        className="px-4 py-2 border rounded disabled:opacity-40"

                                    >

                                        Previous

                                    </button>

                                    {

                                        [...Array(totalPages)].map((_, index) => (

                                            <button

                                                key={index}

                                                onClick={() => setPage(index)}

                                                className={`px-4 py-2 rounded ${page === index
                                                    ? "bg-blue-600 text-white"
                                                    : "border"
                                                }`}

                                            >

                                                {index + 1}

                                            </button>

                                        ))

                                    }

                                    <button

                                        disabled={page + 1 >= totalPages}

                                        onClick={() =>
                                            setPage(page + 1)
                                        }

                                        className="px-4 py-2 border rounded disabled:opacity-40"

                                    >

                                        Next

                                    </button>

                                </div>

                                <select

                                    value={size}

                                    onChange={(e) => {

                                        setSize(Number(e.target.value));

                                        setPage(0);

                                    }}

                                    className="border rounded px-3 py-2"

                                >

                                    <option value={5}>5</option>

                                    <option value={10}>10</option>

                                    <option value={20}>20</option>

                                    <option value={50}>50</option>

                                </select>

                            </div>

                        </>

                    )

            }

        </div>

    );

}

export default EmployeeListPage;