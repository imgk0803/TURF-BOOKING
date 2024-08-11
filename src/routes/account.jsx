import { useState } from "react"
import BookingComponent from "../components/bookingComponent"

export default function Account(){
    const[view , setview] = useState("transaction")
    
    return(
    
        <>
            <section className="flex flex-row p-3">
             <div className="flex flex-col gap-5 w-1/3 justify-start items-center border-r-2 p-2 ">
                <span class="material-symbols-outlined text-4xl">mood</span>
                <span>Name</span>
                <span>email</span>
                <span>phone number</span>
                <button onClick={()=>setview("transaction")} className="bg-green-500 rounded-md shadow-md text-white  w-40">Transactions</button>
                <button onClick={()=>setview("editprofile")} className="bg-green-500 rounded-md shadow-md text-white w-40">Edit profile</button>
             </div>
             <div className="flex flex-grow m-0 min-h-screen">
                {
                    view === "transaction" && (<>
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
                          </> )} 
                          { view === "editprofile" && (<>
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

             </div>
            </section>
        </>
    )
}