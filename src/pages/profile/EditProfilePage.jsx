import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import {
    getCurrentUser,
    updateProfile,
} from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

function EditProfilePage() {

    const navigate = useNavigate();

    const { refreshUser } = useAuth();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {

        const loadUser = async () => {

            try {

                const data = await getCurrentUser();

                setForm({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                });

            } catch (err) {

                console.error(err);

                toast.error("Unable to load profile.");

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            await updateProfile(form);

            await refreshUser();

            toast.success("Profile updated successfully.");

            navigate("/profile");

        } catch (err) {

            console.error(err);

            toast.error("Unable to update profile.");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="animate-pulse space-y-5">

                <div className="h-10 bg-gray-200 rounded" />

                <div className="h-14 bg-gray-200 rounded" />

                <div className="h-14 bg-gray-200 rounded" />

                <div className="h-14 bg-gray-200 rounded" />

            </div>

        );

    }

    return (

        <div className="max-w-2xl">

            <h1 className="text-3xl font-bold mb-8">

                Edit Profile

            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-8 space-y-6"
            >

                <div>

                    <label className="block mb-2 font-medium">

                        First Name

                    </label>

                    <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Last Name

                    </label>

                    <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div>

                    <label className="block mb-2 font-medium">

                        Email

                    </label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="border px-6 py-3 rounded-lg"
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditProfilePage;