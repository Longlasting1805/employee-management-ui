function ConfirmModal({
                          isOpen,
                          title,
                          message,
                          confirmText = "Confirm",
                          cancelText = "Cancel",
                          onConfirm,
                          onCancel,
                          loading = false,
                      }) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 scale-100 transition-all duration-300">

                <h2 className="text-2xl font-bold text-slate-900">
                    {title}
                </h2>

                <p className="text-slate-500 mt-3 leading-7">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="border border-slate-300 px-5 py-2 rounded-lg hover:bg-slate-100 transition"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 active:scale-95 transition text-white px-5 py-2 rounded-lg"
                    >
                        {
                            loading
                                ? "Deleting..."
                                : confirmText
                        }
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;