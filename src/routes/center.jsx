import { useEffect, useState } from "react"
import axios from 'axios'
import Turf from "../components/turf"
export default function Center(){
const [turfs,setturf] = useState([]);
   useEffect(()=>{
       axios.get("http://localhost:3000/api/user/turf")
      .then(res =>{
          setturf(res.data)
      })
   },[])
    return(
        <>
           <section>
            <div className="flex items-center  p-3 h-16 w-screen">
             <div className="flex flex-row justify-between items-center border border-gray-300  rounded-md w-80 p-1">
                <input className="outline-none p-1"placeholder="Search turfs" type="text" />
             <button><span className="material-symbols-outlined pt- text-slate-400">search</span></button></div> 
            </div>
            <div className="grid grid-cols-3 gap-10 p-5">
                 {
                       turfs.map(t=>(
                        <Turf key={t._id}{...t}/>
                       ))



                 }                 
            </div>
           </section>
        
        </>
    )
}