import { useEffect, useState } from "react";
import BookingComponent from "../components/bookingComponent";
import axios from "axios";

export default function MyBookings(){
    const user  = JSON.parse(localStorage.getItem('user'))
    const [bookings, setbookings] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/user/bookings")
        .then(res=> {
        setbookings(res.data.filter(item =>user._id === item.user ));
       
    } )
    
       
        
        
    },[])
    console.log("booking >>",bookings)
    return(
        
             <div className="flex flex-col gap-3 p-5">
                <h2 className="text-2xl font-bold p-2">My Bookings </h2>
                <div className="p-5 flex flex-col gap-3 ">
                {
                    bookings && bookings.map((item,index)=>{
                        let start = item.timeslot.start + "am"
                        let end = item.timeslot.end + "am"
                       
                        if(item.timeslot.start> 12){
                             start = item.timeslot.start - 12 + "pm"
                             end = item.timeslot.end - 12 + "pm"
                           

                        }
                        else if(item.timeslot.start === 12){
                            end = item.timeslot.end - 12 + "pm"
                            start = item.timeslot.start + "am"
                        }
                       return (
                        <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                        <div className="flex flex-row justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">{index+1}. {item.court.turf.title}</h2>
                        <div className="flex flex-col justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">{item.court.sport}</span>
                        <span>Size: {item.court.size}</span>
                        </div>
                        <span className="text-gray-600">{item.date.slice(0,10)}</span>
                        <span className="text-gray-600">{start}-{end}</span>
                        <span className="text-lg font-semibold text-gray-800">{item.price}</span>
                         <div className="flex flex-col justify-center items-center">
                          <span className="text-lg font-semibold text-gray-800">{item.status}</span>                
                          <span className="text-sm  text-gray-800">payment id : {item.payment}</span>
                        </div>
                        </div>
                        </div> 
                        
                    )})
                }
                 
             </div>
             </div>
        
    )
}