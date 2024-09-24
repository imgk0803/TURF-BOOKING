import { Link } from "react-router-dom"
import { useEffect ,useState } from "react";
import axios from "axios";
import TurfAdmin from "../components/turfadmin";
import AddManager from "../components/addManager";
export default function AdminDashboard(){
    const role = localStorage.getItem('role')
    const [turfs,setturf] = useState([]);
    const[turfListing , setList] = useState([])
    const [searchTerm , setSearchTerm] = useState('')
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
    const handleSearch =() =>{
        const filtered = turfs.filter(turf=>{
           return  new RegExp(searchTerm, 'i').test(turf.title)
        })
        setList(filtered)
    }
    const updateslot = async () => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await axios.post("http://localhost:3000/api/admin/update-timeslots", null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error updating timeslots:", error.response ? error.response.data : error.message); // Handle errors
    }
};

    const resetslot = async()=>{
        const token = localStorage.getItem('token')
        try{
            await axios.post("http://localhost:3000/api/admin/reset-slots",null,{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
        }
        catch(err){
            console.log(err)
        }
        
    }
    return(
        <>
           <section className="flex flex-col gap-3 p-5">
                <div className="flex flex-row justify-stretch gap-1 ">
                    <div className="flex flex-row border dark:border-gray-600 shadow-md dark:bg-gray-900 rounded-md">
                        <input onChange={(e)=>{setSearchTerm(e.target.value)}} className="p-2 dark:bg-gray-900  " type="text" name="" id="" placeholder="search"/>
                        <button onClick={handleSearch}><span className="material-symbols-outlined pt-1 text-slate-400">search</span></button>
                    </div>
                 
                  <Link to={'/root/createturf'} className="p-2 text-center bg-green-500 rounded-md text-white w-full">Add turf</Link>
                  <button disabled={role !== 'admin'} onClick={togglePop} className="p-2 bg-green-500 rounded-md text-white w-full">add manager</button>
                  <button disabled={role !== 'admin'} className="p-2 bg-green-500 rounded-md text-white w-full" onClick={updateslot}>UpdateSlots</button>
                  <button disabled={role !== 'admin'} className="p-2 bg-green-500 rounded-md text-white w-full" onClick={resetslot}>ResetSlots</button>
                </div>
                {
               turfListing.length > 0 &&( <>
               <div className="flex flex-row justify-start items-center gap-10 pt-5 px-5">
               <h3 className="text-lg text-gray-500">Results </h3>
               <button onClick={()=>{setList('')}} className="text-sm text-gray-500">x</button>
            </div>
            <div className="grid grid-cols-3 gap-10 px-5 pb-5  place-items-center  ">
            {
                     turfListing && turfListing.map(turf=>
                        (  <TurfAdmin  key={turf._id}{...turf}/>)
                        )

            }
            </div>
               </>)
             }
                <div> 
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

