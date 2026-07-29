import Skeleton from "../common/Skeleton";

function EmployeeTableSkeleton() {

    return (

        <div className="bg-white rounded-xl shadow">

            <div className="p-6 space-y-4">

                {[...Array(5)].map((_, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-5 gap-4"
                    >

                        <Skeleton className="h-5" />

                        <Skeleton className="h-5" />

                        <Skeleton className="h-5" />

                        <Skeleton className="h-5" />

                        <Skeleton className="h-5" />

                    </div>

                ))}

            </div>

        </div>

    );

}

export default EmployeeTableSkeleton;