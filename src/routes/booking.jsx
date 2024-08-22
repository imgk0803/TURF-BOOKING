import { useState , useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocation, useParams } from "react-router-dom"
import BookingComponent from "../components/bookingComponent"
import axios from "axios"

export default function Booking(){
    const navigate = useNavigate()
    const {turfid} = useParams()
    const [message , setmessage] = useState('')
    const [turfname , setturfname] = useState('')
    const [courts , setCourts] = useState([])
    const [place , setplace] = useState('')
    const [timeslot ,settimeslot] = useState([])
    const[selectedCourt ,setCourt] = useState('')
    const[date , setdate] = useState('')
    const[time , settime] = useState('')
    useEffect(()=>{
            axios.get(`http://localhost:3000/api/user//turf/getcourt/${turfid}`)
            .then(res=>{
              setCourts(res.data.turf.court)
              setplace(res.data.turf.city)
              setturfname(res.data.turf.title)
              
            }
            )
    },[])
    const handlechange = async(e)=>{
    e.preventDefault()
      try{  
            const selectedCourtId = e.target.value ;
            const court =  courts.filter(c => c._id === selectedCourtId)
            setCourt(court[0])

            settimeslot(court[0].timeslot.filter(ts=>!ts.booked))
                
            
      }
      catch(err){
        console.log(err)
      }
    }
    const addBooking = async(e)=>{
      e.preventDefault()
      try{
          const courtid = selectedCourt._id
          const userid = JSON.parse(localStorage.getItem('user'))._id
          const timeselected = timeslot.find((ts)=>{return time === ts._id})
          const price = selectedCourt.price
          const reqbody = {
            date : date,
            timeslot : timeselected,
            price : price
          }

          const response = await axios.post(`http://localhost:3000/api/user/${userid}/court/${courtid}`,reqbody)
          console.log(response)
          if(response.data === "this time slot isnt available"){
            setmessage(response.data)
          }
          else{
            setmessage('')
          }
         

      }
      catch(err){
       console.log("error::",err)
      }
   }
  /* const loadBooking = async()=>{
      try{

      }
      catch(err){
              console.log("error::", err)
      }
   }*/
    return(
        <><section className="grid grid-cols-2 p-10">
             <div>
                <h2 className="p-1 font-semibold text-2xl">{turfname}</h2>
                <span className="p-1 text-lg">{place}</span>
                <form onSubmit={addBooking} action="submit" className="flex flex-col gap-10 border rounded-md shadow-md py-8">
                    <div className="flex flex-row gap-5 items-center justify-around">
                    <label className="font-semibold" htmlFor="court">Sports:</label>
                    <select onChange={handlechange} name="court" id="court" className=" shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                    {courts.map((court) => (
                                <option className="shadow-md" key={court._id} value={court._id}>
                                {court.sport} - {court.size} - {court.description}
                                </option>
                            ))}
                  </select>
                    </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                     <label className="font-semibold" htmlFor="court">Date:</label>
                     <input onChange={(e)=>{setdate(e.target.value)}} className=" shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none" type="date" id="bookdate" name="bookdate" min={new Date().toISOString().split('T')[0]}/>
                     </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                       <label className="font-semibold" htmlFor="court">Timeslot:</label>
                       <select onChange={(e)=>{settime(e.target.value)}} name="timeslot" id="timeslot" className=" shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                            {timeslot && timeslot .filter((ts) => !ts.booked).map((ts) => (
                          <option
                          className="p-1 text-sm font-mono hover:bg-green-400 rounded-md" key={ts._id} value={ts._id}>
                          {ts.start} - {ts.end}
                          </option>
                        ))
                        }
                  </select>
                 
                      </div>
                      {message && (<div ><span className="flex items-center justify-center p-1 text-red-500">{message}</span></div>)}
                      <div className="grid grid-cols-2" >
                        <div className="flex flex-col gap-3 p-2 pl-20">
                        <h4>court details</h4>
                        <span>{selectedCourt.size}</span>
                        <span>{selectedCourt.description}</span>
                        <span>{selectedCourt.price}</span>
                        </div>
                        <button  className="h-10 w-40 m-10 bg-green-500 text-white border shadow-md rounded-md">Add to cart</button>
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