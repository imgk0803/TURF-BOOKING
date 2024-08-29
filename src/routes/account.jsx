import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Account(){
    const navigate = useNavigate()
    const[view , setview] = useState("transaction")
    const [payments, setpayments] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(()=>{
    console.log(user)
          axios.get("http://localhost:3000/api/user/payments")
          .then(res=> setpayments(res.data.filter(item=>user._id === item.user)))
          .catch(err=>alert("something went wrong"))

          
          
          
    },[])
   console.log(payments)
    return(
    
        <>
            <section className="flex flex-row p-3">
             <div className="flex flex-col gap-5 w-1/3 justify-start items-center border-r-2 p-2 ">
                <span className="material-symbols-outlined text-4xl">mood</span>
                <span className="font-semibold">{user.username}</span>
                <span>{user.email}</span>
                <span>{user.phone}</span>
                <button onClick={()=>setview("transaction")} className="bg-green-500 rounded-md shadow-md text-white  w-40">Transactions</button>
                <button onClick={()=>setview("editprofile")} className="bg-green-500 rounded-md shadow-md text-white w-40">Edit profile</button>
                 <button onClick={()=>{navigate('/signin',{new:true})}}  className="bg-green-500 rounded-md shadow-md text-white w-40">Logout</button>
             </div>
             <div className="flex flex-grow m-0 min-h-screen">
                {
                    view === "transaction" && (<>
                    
                           <div className="flex flex-col w-full gap-4 p-3">
                            {
                                payments && payments.map(item=>(
                                     
                                <div className="flex flex-row justify-between items-center border shadow-lg rounded-md p-3">
                                    <div className="flex flex-col"><span>date</span><span>{item.created && item.created.slice(0,10)}</span></div>
                                    <div className="flex flex-col"><span>price</span><span>{item.amount}</span></div>
                                    <div className="flex flex-col"><span>status</span>{item.p_status}</div>
                                </div>

                            

                                ))
                            }
                           </div>
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