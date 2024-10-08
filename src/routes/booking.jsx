import { useState , useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "../features/cart/cartslice"
import axiosInstance from "../utils/axiosInstance"

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
    const[today ,setToday] = useState({})
    const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const formattedDate = new Date(currentDate).toISOString().split("T")[0];
    useEffect(()=>{
            axiosInstance.get(`/api/user//turf/getcourt/${turfid}`)
            .then(res=>{
              setCourts(res.data.turf.court)
              setplace(res.data.turf.city)
              setturfname(res.data.turf.title)

              
            }
            )
    },[click])
    console.log("today", formattedDate)
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
      if (!selectedCourt || !date || !time) {
        setmessage('Please fill out all fields before proceeding.');
        return;
      }
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

          const response = await axiosInstance.post(`/api/user/${userid}/court/${courtid}`,reqbody)
          console.log("res",response)
          const booking = {
            turfname :turfname,
            courtname : selectedCourt.sport,
            size : selectedCourt.size,
            date : date,
            time : timeselected,
            price : selectedCourt.price,
            bookingid : response.data._id
          }
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
        const res  = await axiosInstance.delete(`/api/user/deletebooking/${id}`)
        setClick(!click)
      }
      catch(err){
              console.log("error::", err)
      }
   }
   
    return(
        <>
        <button onClick={()=>{navigate(-1)}} className="bg-green-500 text-white m-2 p-1 rounded-md">Back</button>
        <section className="grid grid-cols-2 p-10 dark:bg-gray-900">
          
             <div>
                <h2 className="p-1 font-semibold text-2xl">{turfname}</h2>
                <span className="p-1 text-lg">{place}</span>
                <form name="bookingform" onSubmit={addBooking} action="submit" className=" dark:bg-gray-950 flex flex-col gap-10 border rounded-md shadow-md py-8">
                    <div className="flex flex-row gap-5 items-center justify-around">
                    <label className="font-semibold dark:text-gray-300" htmlFor="court">Sports:</label>
                    <select onChange={handlechange} name="court" id="court" className=" dark:text-gray-300 dark:bg-gray-900 shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                    {courts.map((court) => (
                                <option className="shadow-md  dark:text-gray-300 dark:bg-gray-900 " key={court._id} value={court._id}>
                                {court.sport} - {court.size} - {court.description}
                                </option>
                            ))}
                  </select>
                    </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                     <label className=" dark:text-gray-300 font-semibold" htmlFor="court">Date:</label>
                     <input onChange={(e)=>{setdate(e.target.value)}} className=" dark:text-gray-300 dark:bg-gray-900  shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none" type="date" id="bookdate" name="bookdate" 
                     min={formattedDate}
                     max={formattedDate} />
                     </div>
                     <div className="flex flex-row gap-5 items-center justify-around">
                       <label className="font-semibold  dark:text-gray-300" htmlFor="court">Timeslot:</label>
                       <select onChange={(e)=>{settime(e.target.value)}} name="timeslot" id="timeslot" className=" dark:text-gray-300 dark:bg-gray-900  shadow-md text-slate-600 border border-slate-200 p-1 h-8 rounded-md w-48 outline-none">
                    <option value="placeholder">--choose an option---</option>
                            {timeslot && timeslot .filter((ts) => !ts.booked).map((ts) =>{
                            let start = ts.start + "am"
                            let end = ts.end + "am"
                           
                            if(ts.start > 12){
                              if(ts.end === 24){
                                 start = ts.start - 12+ "pm"
                                 end = ts.end -12 + "am"
                              }else{
                                   start = ts.start - 12 + "pm"
                                 end = ts.end - 12 + "pm"
                              }
                                
                               
    
                            }
                            else if(ts.start === 12){
                                end = ts.end - 12 + "pm"
                                start = ts.start + "pm"
                            }
                       
                             return (
                          <option
                          className=" dark:text-gray-300 dark:bg-gray-900  p-1 text-sm font-mono hover:bg-green-400 rounded-md" key={ts._id} value={ts._id}>
                          {start} - {end}
                          </option>
                        )})
                        }
                  </select>
                 
                      </div>
                      {message && (<div ><span className="flex items-center justify-center p-1 text-red-500">{message}</span></div>)}
                      <div className="grid grid-cols-2" >
                        <div className="flex flex-col  dark:text-gray-300 text-lg font-semibold items-start justify-start gap-3 p-2 pl-20">
                        <h4>{selectedCourt.sport}</h4>
                        <span>{selectedCourt.size}</span>
                        <span>{selectedCourt.description}</span>
                        <span>{selectedCourt.price}</span>
                        </div>
                        <button  className="h-10 w-40 m-10 dark:bg-green-800 bg-green-500 text-white border shadow-md rounded-md">Add to cart</button>
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
                            <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg shadow-md bg-white  dark:text-gray-300 dark:bg-gray-950 ">
                               <div className="flex flex-row justify-between">
                                <h2 className="text-xl font-semibold  dark:text-gray-300 text-gray-800">{items.turfname}</h2>
                                 <button onClick={()=>{removeBooking(items.bookingid)}}><span className="material-symbols-outlined text-red-600">delete</span></button></div>
                              <div className="flex flex-row justify-between items-center dark:text-gray-300">
                                  <span className="text-lg font-semibold  dark:text-gray-300 text-gray-800">{items.courtname}</span>
                                  <span>{items.size}</span>
                              </div>
                              <span className="  dark:text-gray-300 text-gray-600">{items.date}</span>
                              <span className=" dark:text-gray-300 text-gray-600">{items.time.start}-{items.time.end}</span>
                              <span className=" dark:text-gray-300 text-lg font-semibold text-gray-800">{items.price}</span>
                             </div>
                           </div>
                        
                        )
                      })
                    }
                   
                     <Link to={{pathname :"/root/checkout", state:{ turf : turfname }}}className="dark:bg-green-800 w-72 p-3 bg-green-500 border text-white rounded-lg">Procced to checkout</Link>
              </div>
             </div>
        </section>
        </>
    )
}