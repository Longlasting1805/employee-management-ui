import { FaSearch } from "react-icons/fa";

function EmployeeSearch({ value, onChange }) {
    return (
        <div className="relative">

            <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search employees..."
                value={value}
                onChange={onChange}
                className="pl-10 pr-4 py-3 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>
    );
}

export default EmployeeSearch;