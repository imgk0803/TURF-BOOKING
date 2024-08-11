import BookingComponent from "../components/bookingComponent";

export default function MyBookings(){
    return(
        <>
             <div className="flex flex-col gap-3 p-5">
                <h2 className="text-2xl font-bold p-2">My Bookings </h2>
                <div className="p-5">
                <BookingComponent/>
                </div>
              
             </div>
        </>
    )
}