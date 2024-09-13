import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { averageRating } from "../hooks/useAverageRating"
export default function Turf({_id,title,city,dist,image,court}){
    const [review ,setReview] = useState([])
    const [ratings ,setRatings] = useState()
    const newCourt = court.map(c=>c.sport)
    const sports = [... new Set(newCourt) ]
    useEffect(()=>{
         axios.get(`http://localhost:3000/api/user/getoneturf/${_id}`)
         .then(res => {
            setReview(averageRating(res.data.reviews));
            setRatings(res.data.reviews.length)

         })

    })
    return(
        <>
           <article className=" flex flex-col gap-2 p-5 bg-slate-50 text-slate-800 border border-slate-100 shadow-lg rounded-md w-72 mt-4 hover:scale-110 transition-all duration-300" >
            
            <img className="h-52 object-cover rounded-lg"src={image} alt="" />
            <div className="flex flex-row justify-between font-semibold items-center">
            <h3 className="text-lg">{title}</h3>
            <span className="text-xs"><span className="material-symbols-outlined text-yellow-500 text-sm pt-1">star</span>{review}({ratings})</span></div>
            <span>{city},{dist}</span>
            <ul className="flex flex-row justify-start items-center gap-1 ">
                {
                    sports.map((sport,index)=>(
                        <li className="border shadow-lg rounded-xl text-xs p-1" key={index}>{sport}</li>   
                    ))
                   
                }</ul>
            <Link to={"/root/turf/"+_id}className="border rounded-md bg-green-500 p-1 text-white text-center">View</Link>
        
        
           </article>
        </>
    )
}