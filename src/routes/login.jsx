import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


export default function LoginAndSignin(){
    const [select ,setSelect] = useState(true)
    
    return(
        <>
        
           <section className="w-screen h-screen grid grid-cols-2 "
            style={{
                backgroundImage: `url('https://res.cloudinary.com/dpxgeasl4/image/upload/v1725910594/hotktr7e8u7loenmbnts.jpg')`,
                backgroundSize: 'cover',  // Ensures the image covers the whole section
                backgroundPosition: 'center',  // Centers the background image
              }}>
            <div className="h-screen flex items-center justify-center">
               
               <h1 className="  text-white font-custom text-4xl">Welcome to <span className="text-white">BOOKmyTURF</span></h1>
                
            </div>
            <div>
             <div className="w-48 flex flex-row justify-between items-center gap-2 mx-auto p-5 ">
             <Link to="signup"className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md">SignUP</Link>
             <Link to="signin" className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md" >LogIn</Link>
              </div>
             <div className="max-w-80 min-h-80 shadow-2xl mx-auto bg-white rounded-md p-5">
              <Outlet/>
             </div>
            </div>
           </section>
        </>
    )
}