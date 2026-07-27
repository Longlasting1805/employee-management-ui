import { useParams } from "react-router-dom";
import EmployeeForm from "../../components/employees/EmployeeForm";

function EditEmployeePage() {

    const { id } = useParams();

    return (
        <EmployeeForm
            mode="edit"
            employeeId={id}
        />
    );
}

export default EditEmployeePage;