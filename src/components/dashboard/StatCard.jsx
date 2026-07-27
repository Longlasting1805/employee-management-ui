function StatCard({
                      icon,
                      title,
                      value,
                  }) {

    return (

        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm uppercase tracking-wide">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-3 break-words">

                        {value}

                    </h2>

                </div>

                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl text-2xl">

                    {icon}

                </div>

            </div>

        </div>

    );

}

export default StatCard;