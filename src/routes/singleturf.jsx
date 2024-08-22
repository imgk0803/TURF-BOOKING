import { useEffect ,useState } from "react";
import { Link } from "react-router-dom";
import MapComponent from "../components/mapComponent"
import { useParams } from "react-router-dom"
import axios from "axios";
import Review from "../components/addReview";
export default function TurfSingle(){
     const{turfid} = useParams();
     const[turf ,setturf] = useState([])
     const [seen, setSeen] = useState(false)

    function togglePop () {
        setSeen(!seen);
    };

     useEffect(()=>{
          axios.get(`http://localhost:3000/api/user/getoneturf/${turfid}`)
          .then(res=>{
            setturf(res.data)
          })  
     },[])
     const latitude = turf.lat
     const longitude = turf.long
    return(
        <>
         <section className="flex flex-row p-5 ">
            <div className="w-2/3 pl-16 text-slate-600 flex flex-col gap-2">
              <h1 className="p-1 font-semibold text-3xl">{turf.title}</h1>
              <div className="p-2 flex flex-row">   
                <span className="mr-10 font-semibold">{turf.city}</span>
                <span className="flex flex-row items-center">
                  <span className="material-symbols-outlined text-yellow-500 text-md pt-1">star</span>(3 ratings)
                </span>
              </div>
              <img className="border rounded-md"src={turf.image} alt="" />
               <div className="pt-5">
               <span className="text-lg font-semibold p-1">sports available</span>
               <ul className="flex flex-row gap-3 mt-3">
               {
               turf.court && turf.court.map(c=>(
                  <li className="border border-slate-500 rounded-xl text-sm p-1" key={c._id}>{c.sport}</li>
                ))
               }
              </ul>
               </div>
              <div className="pt-5">
              <span className="text-lg font-semibold p-1">fecilities</span>
              <ul className="flex flex-row gap-3">
                <li  className="border border-slate-500 rounded-xl text-sm p-1">drinking</li>
                <li  className="border border-slate-500 rounded-xl text-sm p-1">restroom</li>
              </ul>
              </div>
            </div>
            <div className="w-1/3 pt-16 pl-12 flex flex-col gap-6 pr-3">
              <Link to={"/root/booking/"+turfid}  className="p-2 text-white bg-green-500 w-80 border rounded-md">Book now</Link>
             <div><h4>timing</h4>
             <span>6AM-12PM</span></div> 
              <div><h4>location</h4>
              <span>{turf.city} ,{turf.dist} ,</span>
              <span>kerala</span></div>
              <div className="border min-h-60 ">
              {latitude && longitude && !seen ? (
              <MapComponent latitude={latitude} longitude={longitude} />
                ) : (
              <p></p>
               )}
              </div>
              <button onClick={togglePop} className="p-2 text-white bg-green-500 w-80 border rounded-md">Add review</button>
              {seen ? <Review toggle={togglePop}/> : null}
            </div>
         </section>
        </>
    )
}