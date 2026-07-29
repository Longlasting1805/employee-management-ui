import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { changePassword } from "../../services/authService";

function ChangePasswordPage() {

    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        try {

            setSaving(true);

            await changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });

            toast.success("Password changed successfully.");

            navigate("/profile");

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Unable to change password."
            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <div className="max-w-2xl">

            <h1 className="text-3xl font-bold mb-8">

                Change Password

            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-xl p-8 space-y-6"
            >

                <PasswordField
                    label="Current Password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    show={showCurrent}
                    toggle={() => setShowCurrent(!showCurrent)}
                />

                <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    show={showNew}
                    toggle={() => setShowNew(!showNew)}
                />

                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirm}
                    toggle={() => setShowConfirm(!showConfirm)}
                />

                <div className="flex gap-4">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >

                        {saving ? "Saving..." : "Change Password"}

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

function PasswordField({
                           label,
                           name,
                           value,
                           onChange,
                           show,
                           toggle,
                       }) {

    return (

        <div>

            <label className="block mb-2 font-medium">

                {label}

            </label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 pr-12"
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                >

                    {show ? <FaEyeSlash /> : <FaEye />}

                </button>

            </div>

        </div>

    );

}

export default ChangePasswordPage;