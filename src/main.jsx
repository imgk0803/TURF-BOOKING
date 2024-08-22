import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root';
import Center from './routes/center';
import LoginAndSignin from './routes/login';
import Signin from './components/signin';
import Signup from './components/signup';
import TurfSingle from './routes/singleturf';
import Booking from './routes/booking';
import Checkout from './routes/checkout';
import MyBookings from './routes/myBookings';
import Account from './routes/account';
import AccountAdmin from './routes/adminAccount';
import Updateturf from './adminRoute/updateTurf';
import AddTurf from './adminRoute/createturf';
import Addcourt from './adminRoute/createcourt';
import AdminDashboard from './adminRoute/adminDashboard';
import AccountManager from './routes/managerAccount';
import ManagerDashboard from './managerRoute/managerDashboard';
import store from './app/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path:"/",
    element:<LoginAndSignin/>,
    children:[
      {
        path:"",
        element:<Signin/>
      },
      {
      path:"signin",
      element:<Signin/>
    },
    {
      path:"signup",
      element:<Signup/>
    }  
    ] //login children ends here
  },
  {
    path: "root",
    element: <Root/>,
    children: [
   
      {
        path: "home",
        element: <Center />,
      },
      {
        path:"turf/:turfid",
        element:<TurfSingle/>,
      },
      {
        path:"booking/:turfid",
        element:<Booking/>
      },
      {
        path:'checkout/',
        element:<Checkout/>
      },
      {
         path : 'mybookings',
         element : <MyBookings/>
      },
      {
        path:'profile',
        element: <Account/>
      },

      {
        path:'profileadmin',
        element : <AccountAdmin/>,
      },
      {
          path : 'profilemanager',
          element : <AccountManager/>
      },
      {
          path : 'updateturf/:turfid',
          element : <Updateturf/>
      },
      {
          path : 'createturf',
          element : <AddTurf/>
      },
      {
          path:'addcourt',
          element: <Addcourt/>
      },
      {
        path:'admindashboard',
        element: <AdminDashboard/>
      },
      {
        path:'managerdashboard',
        element: <ManagerDashboard/>
      }
        
      

    ], // root children ends here
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
