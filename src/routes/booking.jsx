import { useState , useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useParams } from "react-router-dom"
import BookingComponent from "../components/bookingComponent"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../features/cart/cartslice"

export default function Booking(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart) 
    const {turfid} = useParams()
    const [click , setClick] = useState(false)
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
              console.log(cartItems)
              
            }
            )
    },[click])
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
          const booking = {
            turfname :turfname,
            courtname : selectedCourt.sport,
            size : selectedCourt.size,
            date : date,
            time : timeselected,
            price : selectedCourt.price,
            bookingid : response.data._id
          }
          console.log(response)
          const bookingform  = document.getElementsByName('bookingform')
          bookingform.forEach(form=> form.reset())
          setClick(!click)
          if(response.data === "this time slot isnt available"){
            setmessage(response.data)
          }
          else{
            setmessage('')
            dispatch(addToCart(booking))
       

          }
         

      }
      catch(err){
       console.log("error::",err)
      }
   }
  const removeBooking = async(id)=>{
      try{
        dispatch(removeFromCart(id))
        const res  = await axios.delete(`http://localhost:3000/api/user/deletebooking/${id}`)
        console.log(id)
        console.log(res.data)
        setClick(!click)
      }
      catch(err){
              console.log("error::", err)
      }
   }
   
    return(
        <><section className="grid grid-cols-2 p-10">
             <div>
                <h2 className="p-1 font-semibold text-2xl">{turfname}</h2>
                <span className="p-1 text-lg">{place}</span>
                <form name="bookingform" onSubmit={addBooking} action="submit" className="flex flex-col gap-10 border rounded-md shadow-md py-8">
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
                        <div className="flex flex-col text-lg font-semibold items-start justify-start gap-3 p-2 pl-20">
                        <h4>{selectedCourt.sport}</h4>
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
                    <div className="flex flex-row justify-between p-3  border-b border-slate-400">
                      <h2 className="font-semibold">CART<span>({cartItems.quantity})</span></h2>
                    </div>
                    {
                      cartItems.items && cartItems.items.map((items,index) =>{
                        return(
                          
                            <div key={index} className="flex flex-col gap-3 ">
                            <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white">
                               <div className="flex flex-row justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">{items.turfname}</h2>
                                 <button onClick={()=>{removeBooking(items.bookingid)}}><span className="material-symbols-outlined text-red-600">delete</span></button></div>
                              <div className="flex flex-row justify-between items-center">
                                  <span className="text-lg font-semibold text-gray-800">{items.courtname}</span>
                                  <span>{items.size}</span>
                              </div>
                              <span className="text-gray-600">{items.date}</span>
                              <span className="text-gray-600">{items.time.start}-{items.time.end}</span>
                              <span className="text-lg font-semibold text-gray-800">{items.price}</span>
                             </div>
                           </div>
                        
                        )
                      })
                    }
                   
                     <Link to={{pathname :"/root/checkout", state:{ turf : turfname }}}className="w-72 p-3 bg-green-500 border text-white rounded-lg">Procced to checkout</Link>
              </div>
             </div>
        </section>
        </>
    )
}