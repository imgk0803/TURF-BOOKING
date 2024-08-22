import { Link } from "react-router-dom"
import { useEffect ,useState } from "react";
import axios from "axios";
import TurfAdmin from "../components/turfadmin";
export default function AdminDashboard(){
    const [turfs,setturf] = useState([]);
    useEffect(()=>{
       axios.get("http://localhost:3000/api/user/turf")
       .then(res =>{
           setturf(res.data)
       })
    },[])
    return(
        <>
           <section className="flex flex-col p-5">
                <div className="flex flex-row justify-around ">
                  <input className="p-2 border shadow-md rounded-md" type="text" name="" id="" placeholder="search"/>
                  <Link to={'/root/createturf'} className="p-2 bg-green-500 rounded-md text-white">Add turf</Link>
                  <Link className="p-2 bg-green-500 rounded-md text-white">add manager</Link>
                </div>

                <div className="grid grid-cols-3 gap-5 ">
                    {
                    turfs.map(t=>(
                    <TurfAdmin key={t._id}{...t}/>
                    ))



                    }                 
                </div>
           </section>
        </>
    )
}

