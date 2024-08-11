import { Link, Outlet } from "react-router-dom";

export default function LoginAndSignin(){
    
    return(
        <>
        
           <section className="w-screen h-screen grid grid-cols-2 bg-green-950">
            <div className="h-screen flex items-center justify-center">
               
               <h1 className="  text-white font-custom text-4xl">Welcome to <span className="text-green-500">BOOKmyTURF</span></h1>
                
            </div>
            <div>
             <div className="w-48 flex flex-row justify-between items-center gap-2 mx-auto p-5 ">
             <Link to="signup"className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md">SignUP</Link>
             <Link to="signin" className="border-b border-green-500 text-white hover:scale-105 hover:rounded-md" >LogIn</Link>
              </div>
             <div className="max-w-80 min-h-80 border mx-auto bg-white rounded-md p-5">
              <Outlet/>
             </div>
            </div>
           </section>
        </>
    )
}