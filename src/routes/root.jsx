import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Center from "./center";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import Turf from "../components/turf";
import { getSortedTurfs } from "../features/sortedTurfs/sortedTurfsSlice";

export default function Root(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = localStorage.getItem('role');
  const geoApi = '150def1d6924f8d2b980f4c1de64506b'
  const [city , setCity]=useState('') 
  const[cityresults , setCityResults] = useState([])
  const[sortedTurfs , setSortedTurfs] = useState([])
  const sorted = useSelector(state =>state.turfs)
  const handleSubmit = async(e)=>{
     try{
      const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${geoApi}`)
      setCityResults(res.data)
     }
     catch(err){
      console.log(err)
     }
  }
  const handleCityClick = (city)=>{
    dispatch(getSortedTurfs(city))
    setCity('')
    setCityResults([])
  }

  console.log("sorted " , sorted)
  const roleBasedRoute = ()=>{
    
    if(user === 'user'){
        
        navigate('/root/profile')
    }
    else if( user === 'manager'){
       navigate('/root/profilemanager')
    }
    else{
      navigate('/root/profileadmin')
    }
  }
  return(
    <>
    <header className="z-10 h-16 flex flex-row justify-between items-center  p-2 shadow-sm fixed bg-white w-full">
        <h1 className="text-2xl font-mono pl-5  text-green-500">BOOKmyTURF</h1>
        <div className="relative flex flex-col justify-start items-start">
          <div className="flex flex-row items-center border w-52 shadow-md h-6 rounded-md">
            <input onChange={(e)=>{
            setCity(e.target.value)
            }} className="outline-none rounded-md w-full font-light h-5 text-xs p-1" placeholder="Enter location" type="text" />
            <button>
              <span onClick={handleSubmit} className="material-symbols-outlined pt-1 text-xs  text-slate-500">location_on</span>
              </button>
          </div>
          {cityresults.length > 0 && (
          <ul className="absolute bg-white border shadow-md mt-1 z-20 w-full max-h-40 overflow-y-auto">
            {cityresults.map((city) => (
              <li 
                key={city._id}
                onClick={()=>{
                  handleCityClick(city);

                }} 
                className="cursor-pointer p-1 text-xs hover:bg-slate-100"
              >
                {city.name}, {city.state}, {city.country}
              </li>
            ))}
          </ul>
        )}
        </div>
        
        <nav>
            <ul className="flex flex-row justify-center items-center text-lg  gap-10 text-md text-slate-500 font-semibold pr-10 ">
                <Link to={'home'}>
                <li className="flex flex-col items-center justify-center ">
                <span className="material-symbols-outlined ">stadium</span>
                <span className="text-xs font-light">Home</span></li></Link>
                <Link to={'mybookings'}>
                <li className="flex flex-col items-center justify-center ">

                  <span className="material-symbols-outlined">sports</span>
                  <span className="text-xs font-light">Bookings</span>
                  </li></Link>
                <button onClick={roleBasedRoute}>
                <li className="flex flex-col items-center justify-center ">

                      <span className="material-symbols-outlined ">person</span>
                      <span className="text-xs font-light">Account</span>
                    </li>
                </button>
            </ul>
        </nav>
    </header>
    {
      sortedTurfs.length > 0 && sortedTurfs.map(turf=>
      (  <Turf  key={turf._id}{...turf}/>)
      )

    }
    <main className="min-h-screen pt-20 px-10">
    <Outlet/>
    </main>
     <footer className="h-16 flex flex-row justify-between p-2 border-t-2">
     <div className="m-0 p-0 gap-0"><h1 className="text-3xl font-mono text-green-400 m-0">BOOKmyTURF</h1>
     <span className="text-sm text-slate-500 m-0">A sports communtiy app</span>
     </div>
     </footer>



    </>
  )
}