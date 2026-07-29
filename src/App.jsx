import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";

import DashboardPage from "./pages/dashboard/DashboardPage";

import EmployeeListPage from "./pages/employees/EmployeeListPage";
import CreateEmployeePage from "./pages/employees/CreateEmployeePage";
import EditEmployeePage from "./pages/employees/EditEmployeePage";

import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage";

import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LoginPage />}
            />

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/employees"
                    element={<EmployeeListPage />}
                />

                <Route
                    path="/employees/new"
                    element={<CreateEmployeePage />}
                />

                <Route
                    path="/employees/edit/:id"
                    element={<EditEmployeePage />}
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/profile/edit"
                    element={<EditProfilePage />}
                />

            </Route>

            <Route
                path="/change-password"
                element={<ChangePasswordPage />}
            />

        </Routes>

    );

}

export default App;