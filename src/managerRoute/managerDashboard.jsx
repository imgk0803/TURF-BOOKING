import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ManagerDashboard(){
    const navigate = useNavigate()
    const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    };
    return(
        <> <button onClick={()=>{navigate(-1)}} className=" text-white bg-green-500 rounded-md p-1 m-2 ">Back</button>
           <section className="flex flex-col items-center gap-3 p-5">
           <h1 className="text-4xl">Turf name</h1>
           <span className="text-xl">location</span>
            <div className="flex flex-col p-3 w-full">
            <ul className="flex flex-col gap-2 p-1">
                  <li className="border border-slate-500 shadow-md w-full rounded-md">
                         <div className="flex flex-row justify-between text-lg items-center p-1 gap-1">
                           <span className="p-1">date</span> 
                           <span>user</span>
                           <span>court</span>
                           <span>timeslot</span>
                           <div className="flex flex-col gap-1 p-1">
                            <button className="bg-red-600 text-sm text-white p-1 rounded-md shadow-md">cancel</button>
                            <button onClick={togglePop} className="bg-green-500 text-sm text-white p-1 rounded-md shadow-md">reschedule</button>
                           </div>
                         </div>
                  </li>
                  {seen &&( <>
                                   <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
                                   <div className="flex flex-col gap-3 bg-white w-96 p-5 rounded-md"> 
                                   <h1 className="text-xl p-1">update the timeslot</h1>
                                    <select className="p-1" name="timslot" id="">
                                        <option value="6">6-7</option>
                                        <option value="7">7-8</option>
                                    </select>
                                    <button onClick={togglePop} className="bg-green-400 text-white p-1 rounded-md">update</button>
                                   </div>
                                   </div>
                            </>)}    
            </ul>                

            </div>
          
           </section>  
        </>
    )
}