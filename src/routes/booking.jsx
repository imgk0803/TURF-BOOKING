import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import BookingComponent from "../components/bookingComponent"

export default function Booking(){
    const {turfid} = useParams()
    const location =useLocation()
    const turf = location.state.tname
    const courts = location.state.courts
    const place = location.state.tplace
    return(
        <><section className="grid grid-cols-2 p-10">
             <div>
                <h2 className="p-1 text-xl">{turf}</h2>
                <span className="p-1 text-lg">{place}</span>
                <form action="submit" className="flex flex-col gap-10 border rounded-md shadow-md py-8">
                    <div className="flex flex-row gap-5 items-center justify-around">
                    <label htmlFor="court">Sports:</label>
                    <select name="court" id="court" className=" border border-slate-400 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                    {courts.map((court) => ( 
                
                        <option key={court.id} value={court.id}>
                                 {court.sport}-{court.size}-{court.description}
                        </option>))}
                    </select>
                    </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                     <label htmlFor="court">Date:</label>
                     <input  className=" border border-slate-400 h-8 rounded-md w-48 outline-none p-1" type="date" id="bookdate" name="bookdate" min={new Date().toISOString().split('T')[0]}/>
                     </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                       <label htmlFor="court">Timeslot:</label>
                      <select name="court" id="court" className=" border border-slate-400 p-1 h-8 rounded-md w-48 outline-none">
                      <option value="football">6-7</option>
                      <option value="cricket">7-8</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2" >
                        <div className="flex flex-col gap-3 p-2 pl-20">
                        <h4>court details</h4>
                        <span>size</span>
                        <span>description</span>
                        <span>price</span>
                        </div>
                        <button className="h-10 w-40 m-10 bg-green-500 text-white border shadow-md rounded-md">Add to cart</button>
                    </div>
                </form>
             </div>
             <div className="p-10 ">
              <div className="flex flex-col gap-5 w-72 mx-auto">
                    <div className="flex flex-row justify-between p-3  border-b border-slate-400"><h2>cart<span>(3)</span></h2>
                          <span className="material-symbols-outlined text-red-600">delete</span>
                     </div>
                     <div className="flex flex-col gap-3 ">
                        <div className="flex flex-col gap-1 p-1">
                        <BookingComponent/>
                        <button className="bg-red-700 text-white rounded-lg border shadow-lg hover:bg-red-400 transition-all duration-100 ">Delete from cart</button>
                        </div>
                        <div className="flex flex-col gap-1 p-1">
                        <BookingComponent/>
                        <button className="bg-red-700 text-white rounded-lg border shadow-lg hover:bg-red-400 transition-all duration-100 ">Delete from cart</button>
                        </div>
                        <div className="flex flex-col gap-1 p-1">
                        <BookingComponent/>
                        <button className="bg-red-700 text-white rounded-lg border shadow-lg hover:bg-red-400 transition-all duration-100 ">Delete from cart</button>
                        </div>
                      
                        

                        
                     </div>
                     <Link to="/root/checkout"className="w-72 p-3 bg-green-500 border text-white rounded-lg">Procced to checkout</Link>
              </div>
             </div>
        </section>
        </>
    )
}