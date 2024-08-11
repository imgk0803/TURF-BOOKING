import { Link } from "react-router-dom"
export default function TurfAdmin({_id,title,city,dist,image,court}){
    return(
        <>
           <article className=" flex flex-col gap-2 p-5 text-sm bg-slate-50 text-slate-800 border border-slate-100 shadow-lg rounded-md w-72 mt-4 hover:scale-110 transition-all duration-300" >
            
            <img className="h-52 object-cover rounded-lg"src={image} alt="" />
            <div className="flex flex-row justify-between font-semibold items-center">
            <h3 className="text-lg">{title}</h3>
            <span className="text-xs"><span className="material-symbols-outlined text-yellow-500 text-sm pt-1">star</span>4.7(13k)</span></div>
            <span>{city},{dist}</span>
            <ul className="flex flex-row justify-start items-center gap-1 ">
                {
                    court.map(c=>(
                        <li className="border shadow-lg rounded-xl text-xs p-1" key={c._id}>{c.sport}</li>   
                    ))
                   
                }</ul>
            <Link to={"/root/profileadmin/updateturf/"+_id} state={{name:title}} className="border rounded-md bg-green-500 p-1 text-white text-center">update</Link>
        
        
           </article>
        </>
    )
}