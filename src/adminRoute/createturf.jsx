import { Link } from "react-router-dom"
export default function AddTurf(){
    return(
        <>
              <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Create New Turf</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Location:
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
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
                        Description:
                    </label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        rows="3"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image:
                    </label>
                    <input
                        type="file"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <Link to={'/root/profileadmin/addcourt'} className=" bg-green-500 text-white p-2 rounded-md font-semibold hover:bg-green-600">Create Turf</Link>
            </form>
        </div>
        </>
    )
}