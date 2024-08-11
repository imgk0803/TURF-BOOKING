import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Center from "./center";

export default function Root(){
  return(
    <>
    <header className="h-20 flex flex-row justify-between items-center  p-2 border shadow-md">
        <h1 className="text-3xl font-mono  text-green-500">BOOKmyTURF</h1>
        <div className="flex flex-row items-center border border-slate-300 rounded-md">
          <input className="outline-none p-1" placeholder="Enter location" type="text" />
          <button>
            <span className="material-symbols-outlined pt-1 text-slate-900">location_on</span>
            </button>
        </div>
        <nav>
            <ul className="flex flex-row justify-center items-center text-lg  gap-10 text-md text-slate-500 font-semibold pr-10 ">
                <Link to={'home'}>
                <li>
                <span class="material-symbols-outlined">stadium</span></li></Link>
                <Link to={'mybookings'}>
                <li>
                  <span class="material-symbols-outlined">sports</span>
                  </li></Link>
                <Link to={'profile'}>
                <li>
                <span class="material-symbols-outlined">person</span></li></Link>
            </ul>
        </nav>
    </header>
    <main className="min-h-screen">
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