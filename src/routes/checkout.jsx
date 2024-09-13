import { useDispatch, useSelector } from "react-redux";
import BookingComponent from "../components/bookingComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../features/cart/cartslice";
export default function Checkout(){
const navigate  = useNavigate()
const dispatch = useDispatch()
const bookings = useSelector(state =>state.cart.items)
const totalPrice = bookings && bookings.reduce((sum,item)=> sum + item.price , 0 );
const user = JSON.parse(localStorage.getItem('user'))
useEffect(()=>{
    console.log("cartitems>>",bookings)
    console.log("the totalprice>>",totalPrice)
    console.log("user>>",user)
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

 },[])
 const addPayment = async(e)=>{
    e.preventDefault()
    try{
        const bookingids = bookings.map(item => item.bookingid)
        const reqbody = {
            total : totalPrice
        }
        const response  = await axios.post("http://localhost:3000/api/user/createorder",reqbody)
        console.log("response>>",response.data)
            if (!response) {
            alert('Failed to create order. Please try again.');
            return;
            }
        const options = {
            key : "rzp_test_gPDvIx3dsJobeU",
            amount: response.data.amount.toString(),
            currency: response.data.currency,
            name: "Turf Booking",
            description: "Test Transaction",
            order_id: response.data.id,
            

            handler: async (response) => {
         
                try {
                    const verificationResponse = await axios.post("http://localhost:3000/api/user/verifypayment", {
                    pay_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                    user: user._id,
                    bookingsid : bookingids,
                    });
                    console.log("verification response >> ",verificationResponse)
                    if (verificationResponse.status === 200) {
                    alert('Payment successful');
                    dispatch(clearCart())
                    navigate('/root/home')

                    
                    } else {
                    alert('Payment verification failed');
                    }
                }
                catch(err){
                   console.log('Error verifying payment:', err);
                   alert('An error occurred while verifying the payment.');
                }
              },
              prefill: {
               name: user.username,
               email: user.email,
               contact: user.phone,
              },
              theme: {
                color: '#F37254',
              },
      };


      const rzp = new window.Razorpay(options);
      rzp.open();
}

    catch(err){
        console.log("errorr>>",err)
    }
       
 }
    return(
        <>
        <div className="grid grid-cols-2 p-3">
             <div className="flex flex-col gap-3 pt-2 px-5">
             <button onClick={()=>{navigate(-1)}} className="w-10 bg-green-500 rounded-md text-white">Back</button>
               
                {
                    bookings && bookings.map(item => (
                        <BookingComponent key={item.bookingid}{...item}/>
                    ))
                }
                
                
                  
             </div>
             <div class="flex flex-col gap-3 mx-auto bg-white rounded-lg overflow-hidden">
          <table class="w-full border-collapse border-slate-300 shadow-md">
          <tbody>
            <tr class="bg-gray-100">
                <td class="p-4 text-gray-700">Court Price</td>
                <td class="p-4 text-right text-gray-700">{totalPrice}INR</td>
            </tr>
            <tr>
                <td class="p-4 text-gray-700">Convenience Fee</td>
                <td class="p-4 text-right text-gray-700">INR 8.97</td>
            </tr>
            <tr>
                <td class="p-4 text-gray-700 font-bold">Total Amount</td>
                <td class="p-4 text-right text-gray-700 font-bold">{totalPrice + 8.97}INR</td>
            </tr>

        </tbody>
    </table>
    <button onClick={addPayment} className="border rounded-md bg-green-500 text-white shadow-md ">Pay{totalPrice + 8.97}</button>
    </div>

        </div>
        
        </>
    )
}
