import { Link, Navigate, useNavigate } from "react-router-dom"
export default function Signin(){
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
     e.preventDefault();
     navigate('root/home')
    }

    return(
        <>
           <form className="flex flex-col gap-3" action="submit" onSubmit={handleSubmit}>
            <label htmlFor="email">Email<span className="text-red-600"> *</span></label>
            <input className="px-1 border shadow-md rounded-md outline-none"type="text" />
            <label htmlFor="password">Password<span className="text-red-600"> *</span></label>
            <input className="px-1 border shadow-md rounded-md  outline-none" type="text" />
            <button className="bg-green-500 p-1 rounded-md text-white hover:bg-green-600 mt-10" type="submit">Login</button>
            <span><Link className="hover:text-blue-600"to="/signup">Dont have an account?</Link></span>
           </form>
        </>
    )
}