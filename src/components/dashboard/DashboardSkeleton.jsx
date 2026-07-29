import Skeleton from "../common/Skeleton";

function DashboardSkeleton() {

    return (

        <div className="space-y-8">

            <Skeleton className="h-10 w-64" />

            <Skeleton className="h-6 w-80" />

            <div className="grid grid-cols-4 gap-6">

                {[...Array(4)].map((_, index) => (

                    <Skeleton
                        key={index}
                        className="h-36"
                    />

                ))}

            </div>

            <Skeleton className="h-96" />

        </div>

    );

}

export default DashboardSkeleton;