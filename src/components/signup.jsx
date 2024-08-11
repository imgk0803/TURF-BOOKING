export default function Signup(){
    return(
        <>
           <form className="flex flex-col gap-2" action="submit">
           <label htmlFor="name">Name<span className="text-red-600"> *</span></label>
            <input className="px-1 border shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="email">Email<span className="text-red-600"> *</span></label>
            <input className="px-1 border shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="phone">Phone</label>
            <input className="px-1 border shadow-md rounded-md outline-none" type="text" />
            <label htmlFor="password">Password<span className="text-red-600"> *</span></label>
            <input className="px-1 border shadow-md rounded-md outline-none" type="text" />
            <button className="bg-green-500 rounded-md mt-2 p-1 text-white hover:bg-green-600">SignUP</button>
           </form>
        </>
    )
}