export default function Addcourt(){
    return(
        <>
                 <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Add Court to Turf</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Court Name:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Turf ID:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter the ID of the turf"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600"
                >
                    Add Court
                </button>
            </form>
        </div>
        </>
    )
}