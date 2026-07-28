function RecentEmployees({ employees }) {

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-6">

                Recent Employees

            </h2>

            <div className="space-y-4">

                {employees.map(employee => (

                    <div
                        key={employee.id}
                        className="border-b pb-3"
                    >

                        <h3 className="font-semibold">

                            {employee.fullName}

                        </h3>

                        <p className="text-gray-500 text-sm">

                            {employee.email}

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default RecentEmployees;