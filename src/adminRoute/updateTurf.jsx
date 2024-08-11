import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Updateturf(){
    const navigate = useNavigate()
    const location = useLocation();
    const name = location.state.name

    return(
        <> 
       <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Update Turf</h2>
            <span>{name}</span>
            <form  className="flex flex-col gap-4">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value=""
                        
                        className="border rounded p-2 w-full"
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        
                        
                        className="border rounded p-2 w-full"
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                    
                        className="border rounded p-2 w-full"
                    />
                </label>
                <button onClick={()=>navigate('/root/profileadmin')}type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
                    Update Turf
                </button>
            </form>
        </div>
        </>
    )
}