import api from "../api/api";

/**
 * Get paginated employees
 */
export const getEmployees = async (
    page = 0,
    size = 5,
    sortBy = "firstName",
    direction = "asc"
) => {
    const response = await api.get("/employees", {
        params: {
            page,
            size,
            sortBy,
            direction,
        },
    });

    return response.data;
};

/**
 * Search employees
 */
export const searchEmployees = async (
    keyword,
    page = 0,
    size = 5,
    sortBy = "firstName",
    direction = "asc"
) => {
    const response = await api.get("/employees/search", {
        params: {
            keyword,
            page,
            size,
            sortBy,
            direction,
        },
    });

    return response.data;
};

/**
 * Get one employee
 */
export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
};

/**
 * Create employee
 */
export const createEmployee = async (employeeData) => {
    const response = await api.post("/employees", employeeData);
    return response.data;
};

/**
 * Update employee
 */
export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
};

/**
 * Patch employee
 */
export const patchEmployee = async (id, employeeData) => {
    const response = await api.patch(`/employees/${id}`, employeeData);
    return response.data;
};

/**
 * Delete employee
 */
export const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
};