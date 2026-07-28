import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <header className="bg-white rounded-xl shadow-sm p-6 mb-8 flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h2>

                <p className="text-gray-500">
                    Welcome back, Admin 👋
                </p>

            </div>

            <div className="flex items-center gap-6">

                <button className="text-gray-600 hover:text-blue-600 text-xl">
                    <FaBell />
                </button>

                <div className="flex items-center gap-3">

                    <FaUserCircle
                        size={40}
                        className="text-slate-700"
                    />

                    <div>

                        <p className="font-semibold">
                            Administrator
                        </p>

                        <p className="text-sm text-gray-500">
                            ADMIN
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Navbar;