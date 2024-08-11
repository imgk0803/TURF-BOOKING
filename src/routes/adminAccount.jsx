import { useState ,useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import Turf from "../components/turf";
import { Outlet } from "react-router-dom";
import BookingComponent from "../components/bookingComponent"
import TurfAdmin from "../components/turfadmin";

export default function AccountAdmin(){
    const[view , setview] = useState("admindashboard")
    const [turfs,setturf] = useState([]);
    useEffect(()=>{
       axios.get("http://localhost:3000/api/user/turf")
       .then(res =>{
           setturf(res.data)
       })
    },[])
   
    return(
    
        <>
            <section className="flex flex-row p-3">
             <div className="flex flex-col gap-5 w-1/3 justify-start items-center border-r-2 p-2 ">
                <span class="material-symbols-outlined text-4xl">mood</span>
                <span>Name</span>
                <span>email</span>
                <span>phone number</span>
                <button onClick={()=>setview("transactions")} className="bg-green-500 rounded-md shadow-md text-white  w-40">Transactions</button>
                <button onClick={()=>setview("editprofile")} className="bg-green-500 rounded-md shadow-md text-white w-40">Edit profile</button>
                <button onClick={()=>setview("admindashboard")} className="bg-green-500 rounded-md shadow-md text-white  w-40">Dashboard</button>
             </div>
             <div className="flex flex-grow m-0 min-h-screen">
             
                {view === "transactions" &&( <>
                           <ul className="flex flex-col w-full gap-4 p-3">
                            <li className="flex flex-row justify-between items-center border shadow-lg rounded-md p-3">
                                <div className="flex flex-col"><span>date</span><span>27-9-24</span></div>
                                <div className="flex flex-col"><span>Turf</span><span>royal</span></div>
                                <div className="flex flex-col"><span>price</span><span>1500INR</span></div>
                                <div className="flex flex-col"><span>status</span>paid</div>
                            </li>
                            <li className="flex flex-row justify-between items-center border shadow-lg rounded-md p-3">
                                <div className="flex flex-col"><span>date</span><span>27-9-24</span></div>
                                <div className="flex flex-col"><span>Turf</span><span>royal</span></div>
                                <div className="flex flex-col"><span>price</span><span>1500INR</span></div>
                                <div className="flex flex-col"><span>status</span>paid</div>
                            </li>
                            <li className="flex flex-row justify-between items-center border shadow-lg rounded-md p-3">
                                <div className="flex flex-col"><span>date</span><span>27-9-24</span></div>
                                <div className="flex flex-col"><span>Turf</span><span>royal</span></div>
                                <div className="flex flex-col"><span>price</span><span>1500INR</span></div>
                                <div className="flex flex-col"><span>status</span>paid</div>
                            </li>
                           </ul>
                          </>)} 
                          {view === "editprofile"&& ( <>
                                   <div className="flex flex-col gap-3 p-5 justify-center items-center w-full">
                                          <h2 className="p-3 text-2xl border-b-2">Update password</h2>
                                          <form className="bg-slate-200flex flex-col w-1/2 gap-2 p-3 border rounded-md shadow-sm items-start justify-center" action="submit">
                                            <label htmlFor="password">new password</label>
                                            <input className="w-full border rounded-md shadow-sm p-1" type="text" />
                                            <label htmlFor="confirm">confirm password</label>
                                            <input className="w-full border rounded-md shadow-sm p-1" type="text" />
                                            <button className="bg-green-500 text-center w-full text-white p-1 rounded-md">update password</button>
                                          </form>
                                          <h2 className="p-3 text-2xl border-b-2">Update profile</h2>
                                         <form className="bg-slate-200flex flex-col  w-1/2 gap-2 p-3 border rounded-md shadow-sm items-start justify-center" action="submit">
                                               <label htmlFor="username">username</label>
                                               <input  className="w-full border rounded-md shadow-sm p-1" type="text" />
                                               <label htmlFor="phone">phone</label>
                                               <input  className="w-full border rounded-md shadow-sm p-1" type="text" />
                                               <button className="bg-green-500 text-center w-full text-white p-1 rounded-md">update details</button>
                                         </form>

                                   </div>
                           
                          </>)
                }
                {view === "admindashboard" && (
                    <><section>
                               <div className="flex flex-row justify-around ">
                         <input className="p-2 border shadow-md rounded-md" type="text" name="" id="" placeholder="search"/>
                          <Link to={'/root/profileadmin/createturf'} className="p-2 bg-green-500 rounded-md text-white">Add turf</Link>
                         <button className="p-2 bg-green-500 rounded-md text-white">add manager</button>
                     </div>

                    <div className="grid grid-cols-2 gap-10 p-5">
                      {
                       turfs.map(t=>(
                        <TurfAdmin key={t._id}{...t}/>
                       ))



                         }                 
                      </div>
                    </section>
              
                    </>
                )}

             </div>
            </section>
            <div>
                <Outlet/>
            </div>

        </>
    )
}