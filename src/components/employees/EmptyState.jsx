import { FaFolderOpen, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EmptyState() {

    const navigate = useNavigate();

    return (

        <div className="flex flex-col items-center justify-center py-20">

            <FaFolderOpen
                className="text-6xl text-slate-300 mb-6"
            />

            <h2 className="text-3xl font-bold text-slate-700">

                No employees found

            </h2>

            <p className="text-slate-500 mt-3">

                There are no employees to display.

            </p>

            <button
                onClick={() => navigate("/employees/new")}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >

                <FaPlus />

                Add Employee

            </button>

        </div>

    );

}

export default EmptyState;