import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateCourt({_id,sport , description ,size , price}){
    const navigate = useNavigate()
    const [inputPrice , setInputPrice] = useState()
    const token = localStorage.getItem('token')
    const handleSubmit=async(e)=>{
        e.preventDefault();
            try{
                const body = {
                    price : inputPrice,
                    courtid : _id
                }
                axios.post('http://localhost:3000/api/admin/updatecourt',body,{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res=>navigate('/root/admindashboard'))
            }
            catch(err){

            }
    }
    return(
          <article className="p-2 border rounded-md shadow-md font-bold">
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span>Sport</span>
                  <span>:</span>
                  <span>{sport}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span>Type</span>
                  <span>:</span>
                  <span>{description}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span>Price</span>
                  <span>:</span>
                  <span>{price}</span>
              </div> 
              <div className="flex flex-row justify-between gap-3 p-2 ">
                  <span>size</span>
                  <span>:</span>
                  <span>{size}</span>
              </div> 
              <div className="flex flex-row justify-between p-2 h-12">
                  <input onChange={(e)=>{setInputPrice(e.target.value)}} value={inputPrice} className="p-2 outline-none border border-gray-300 rounded-md " type="number" />
                  <button onClick={handleSubmit} className=" p-2 rounded-md  text-white text-xs bg-green-500 font-semibold">Update Price</button>
              </div> 
          </article>
    )
}