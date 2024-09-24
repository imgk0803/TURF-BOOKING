import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";
export default function Signin(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('')
    const [message, setmessage] =useState('')
    const handleSubmit=async(e)=>{
     e.preventDefault();
     try{
        const body = {email,password}
        const response = await axios.post('https://turfbooking-backend.onrender.com/api/user/login',body)
       if(response.data === "password not match"){
           
            setmessage("Incorrect Password !")
        }
        else if(response.data === "no user exists"){
            setmessage("User Doesn\'t Exist !")
        }
        else{
            const{user,role,token} = response.data
            dispatch(login({user,role,token}))
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('role',role)
            navigate('/root/home')
        }
        
     }
     catch(err){
        console.log(err)
     }
    }

    return(
        <>
           <form className="flex flex-col gap-3 " action="submit" onSubmit={handleSubmit}>
            <label htmlFor="email">Email<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>{setemail(e.target.value)}} className="px-1  shadow-lg rounded-md outline-none"type="text" />
            <label htmlFor="password">Password<span className="text-red-600"> *</span></label>
            <input onChange={(e)=>{setpassword(e.target.value)}} className="px-1  shadow-lg rounded-md  outline-none" type="password" />
            {message && (<span className="pl-2 font-thin bg-red-200 rounded-md text-black">{message}</span>)}
            <button className="bg-green-500 p-1 rounded-md text-white hover:bg-green-600 mt-10" type="submit">Login</button>
            <span><Link className="hover:text-blue-600"to="/signup">Dont have an account?</Link></span>
           </form>
        </>
    )
}