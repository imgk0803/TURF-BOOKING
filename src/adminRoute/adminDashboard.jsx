import { Link } from "react-router-dom"
import { useEffect ,useState } from "react";
import axios from "axios";
import TurfAdmin from "../components/turfadmin";
import AddManager from "../components/addManager";
export default function AdminDashboard(){
    const [turfs,setturf] = useState([]);
    const [seen , setSeen] = useState(false);
    const togglePop=()=>{
        setSeen(!seen)
    }
    useEffect(()=>{
       axios.get("http://localhost:3000/api/user/turf")
       .then(res =>{
           setturf(res.data)
       })
    },[])
    const updateslot=async()=>{
        const token = localStorage.getItem('token')
        await axios.post("http://localhost:3000/api/admin/update-timeslots",null,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res=>console.log(res))
    }
    const resetslot = async()=>{
        const token = localStorage.getItem('token')
        await axios.post("http://localhost:3000/api/admin/reset-slots",null,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(res=>console.log(res))
    }
    return(
        <>
           <section className="flex flex-col gap-3 p-5">
                <div className="flex flex-row justify-stretch gap-1 ">
                  <input className="p-2 border shadow-md rounded-md" type="text" name="" id="" placeholder="search"/>
                  <Link to={'/root/createturf'} className="p-2 text-center bg-green-500 rounded-md text-white w-full">Add turf</Link>
                  <button onClick={togglePop} className="p-2 bg-green-500 rounded-md text-white w-full">add manager</button>
                  <button className="p-2 bg-green-500 rounded-md text-white w-full" onClick={updateslot}>UpdateSlots</button>
                  <button className="p-2 bg-green-500 rounded-md text-white w-full" onClick={resetslot}>ResetSlots</button>
                </div>
                {seen && seen?<AddManager toggle={togglePop}/>:null }
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

