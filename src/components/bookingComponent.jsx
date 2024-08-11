export default function BookingComponent({ props }) {
    return (
        <>
            <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                <h2 className="text-xl font-semibold text-gray-800">turf name</h2>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Court Name</span>
                     <span>11X11</span>
                </div>
                <span className="text-gray-600">date</span>
                <span className="text-gray-600">time</span>
                <span className="text-lg font-semibold text-gray-800">price</span>
            </div>
        </>
    );
}
