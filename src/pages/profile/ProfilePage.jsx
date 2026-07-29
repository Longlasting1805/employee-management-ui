import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUserCircle,
    FaEnvelope,
    FaUserTag,
    FaEdit,
    FaKey,
} from "react-icons/fa";

import { getCurrentUser } from "../../services/authService";

function ProfilePage() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const data = await getCurrentUser();

                setUser(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    if (loading) {

        return (

            <div className="animate-pulse space-y-6">

                <div className="h-10 w-64 bg-gray-200 rounded" />

                <div className="bg-white rounded-2xl p-8 shadow space-y-6">

                    <div className="h-28 w-28 rounded-full bg-gray-200" />

                    <div className="h-6 bg-gray-200 rounded w-64" />

                    <div className="h-6 bg-gray-200 rounded w-56" />

                    <div className="h-6 bg-gray-200 rounded w-44" />

                </div>

            </div>

        );

    }

    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    My Profile

                </h1>

                <p className="text-gray-500 mt-2">

                    View your account information.

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

                <div className="flex flex-col md:flex-row md:items-center gap-8">

                    <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                        {initials}

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold">

                            {user.firstName} {user.lastName}

                        </h2>

                        <p className="text-gray-500 mt-2">

                            {user.role}

                        </p>

                    </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-10">

                    <div className="flex items-center gap-4">

                        <FaEnvelope className="text-blue-600 text-xl" />

                        <div>

                            <p className="text-gray-500 text-sm">

                                Email

                            </p>

                            <p className="font-medium">

                                {user.email}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <FaUserTag className="text-blue-600 text-xl" />

                        <div>

                            <p className="text-gray-500 text-sm">

                                Role

                            </p>

                            <p className="font-medium">

                                {user.role}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4">

                        <FaUserCircle className="text-blue-600 text-xl" />

                        <div>

                            <p className="text-gray-500 text-sm">

                                User ID

                            </p>

                            <p className="font-medium break-all">

                                {user.id}

                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex flex-wrap gap-4 mt-10">

                    <button

                        onClick={() => navigate("/profile/edit")}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"

                    >

                        <FaEdit />

                        Edit Profile

                    </button>

                    <button

                        onClick={() => navigate("/change-password")}

                        className="border hover:bg-gray-100 px-6 py-3 rounded-lg flex items-center gap-2"

                    >

                        <FaKey />

                        Change Password

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ProfilePage;