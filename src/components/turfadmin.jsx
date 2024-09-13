import { Link, useNavigate } from "react-router-dom"
import { useState ,useEffect } from "react"
import axios from "axios"
import { averageRating } from "../hooks/useAverageRating"
export default function TurfAdmin({_id,city,dist,image,court}){
    const navigate = useNavigate();
    const [review ,setReview] = useState([])
    const [ratings ,setRatings] = useState()
    const[title ,setTitle] = useState('')
    useEffect(()=>{
         axios.get(`http://localhost:3000/api/user/getoneturf/${_id}`)
         .then(res => {
            setReview(averageRating(res.data.reviews));
            setRatings(res.data.reviews.length)
            setTitle(res.data.title)

         })

    })
    return(
        <>
           <article className=" flex flex-col gap-2 p-5 text-sm bg-slate-50 text-slate-800 border border-slate-100 shadow-lg rounded-md w-72 mt-4 hover:scale-110 transition-all duration-300" >
            
            <img className="h-52 object-cover rounded-lg"src={image} alt="" />
            <div className="flex flex-row justify-between font-semibold items-center">
            <h3 className="text-lg">{title}</h3>
            <span className="text-xs"><span className="material-symbols-outlined text-yellow-500 text-sm pt-1">star</span>{review}({ratings})</span></div>
            <span>{city},{dist}</span>
            <ul className="flex flex-row justify-start items-center gap-1 ">
                {
                    court.map(c=>(
                        <li className="border shadow-lg rounded-xl text-xs p-1" key={c._id}>{c.sport}</li>   
                    ))
                   
                }</ul>
                <div className="flex flex-col gap-2">
                <Link to={"/root/updateturf/"+_id} state={{turfname:title}} className="border rounded-md text-xs bg-green-500 p-1 w-full text-white text-center">update</Link>
                <button onClick={()=>{navigate(`/root/addcourt/${_id}`,{state:{turfname : title}})}} className="border rounded-md text-xs bg-green-500 p-1 text-white text-center w-full">Add Court</button>
             
                </div>
          
        
        
           </article>
        </>
    )
}