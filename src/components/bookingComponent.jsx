import { useDispatch } from "react-redux"
import axios from "axios"
import { removeFromCart } from "../features/cart/cartslice"
export default function BookingComponent({bookingid , courtname,size,price,time,date,turfname}) {
    const dispatch = useDispatch()
    const removeBooking = async(id)=>{
        try{
          dispatch(removeFromCart(id))
          const res  = await axios.delete(`http://localhost:3000/api/user/deletebooking/${id}`)
          console.log(id)
          console.log(res.data)
        }
        catch(err){
                console.log("error::", err)
        }
     }

    return (
        <>
            <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                <div className="flex flex-row justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{turfname}</h2>
                <button onClick={()=>{removeBooking(bookingid)}}><span className="material-symbols-outlined text-red-600">delete</span></button></div>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">{courtname}</span>
                     <span>{size}</span>
                </div>
                <span className="text-gray-600">{date}</span>
                <span className="text-gray-600">{time.start}-{time.end}</span>
                <span className="text-lg font-semibold text-gray-800">{price}</span>
            </div>
        </>
    );
}
