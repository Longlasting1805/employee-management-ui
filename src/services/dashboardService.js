import { getEmployees } from "./employeeService";

export const getDashboardStats = async () => {

    const data = await getEmployees(
        0,
        1000,
        "createdAt",
        "desc"
    );

    const employees = data.content;

    const today = new Date();

    const totalEmployees = employees.length;

    const employeesToday = employees.filter((employee) => {

        const created = new Date(employee.createdAt);

        return (
            created.getDate() === today.getDate() &&
            created.getMonth() === today.getMonth() &&
            created.getFullYear() === today.getFullYear()
        );

    }).length;

    const employeesThisMonth = employees.filter((employee) => {

        const created = new Date(employee.createdAt);

        return (
            created.getMonth() === today.getMonth() &&
            created.getFullYear() === today.getFullYear()
        );

    }).length;

    const newestEmployee =
        employees.length > 0
            ? `${employees[0].firstName} ${employees[0].lastName}`
            : "-";

    return {

        totalEmployees,

        employeesToday,

        employeesThisMonth,

        newestEmployee,

    };

};