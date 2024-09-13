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
           <section className="flex flex-col">
            <div className="flex flex-row justify-start gap-40 items-center  p-3 h-16 w-screen">
             <div className="flex flex-row justify-between items-center bg-white shadow-md  rounded-md w-80 p-1">
                <input className="outline-none p-1 "placeholder="Search turfs" type="text" />
             <button><span className="material-symbols-outlined pt-1 text-slate-400">search</span></button></div> 
              <div className="flex flex-col items-center justify-center pl-6 text-md text-slate-600
               font-thin">
                 
                 <p>Discover the perfect turf for your next game or event! At TurfSpot,</p>
                 <p> we bring you a comprehensive list of top-quality turfs right at your fingertips.</p>
                 
              </div>
            </div>
            <div className="grid grid-cols-3 gap-10 p-5  place-items-center ">
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