import BookingComponent from "../components/bookingComponent";

export default function Checkout(){
    return(
        <>
        <div className="grid grid-cols-2 p-3">
             <div className="flex flex-col gap-3 pt-2 px-5">
                <h2>turf name</h2>
                <BookingComponent/>
                <BookingComponent/>
                <BookingComponent/>
                  
             </div>
             <div class="flex flex-col gap-3 mx-auto bg-white rounded-lg overflow-hidden">
          <table class="w-full border-collapse border-slate-300 shadow-md">
          <tbody>
            <tr class="bg-gray-100">
                <td class="p-4 text-gray-700">Court Price</td>
                <td class="p-4 text-right text-gray-700">INR 380</td>
            </tr>
            <tr>
                <td class="p-4 text-gray-700">Convenience Fee</td>
                <td class="p-4 text-right text-gray-700">INR 8.97</td>
            </tr>
            <tr>
                <td class="p-4 text-gray-700 font-bold">Total Amount</td>
                <td class="p-4 text-right text-gray-700 font-bold">INR 388.97</td>
            </tr>

        </tbody>
    </table>
    <button className="border rounded-md bg-green-500 text-white shadow-md ">Pay 388</button>
    </div>

        </div>
        
        </>
    )
}
