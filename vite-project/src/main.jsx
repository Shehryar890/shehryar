import { Children, StrictMode } from 'react'
import { createRoot  } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
 import Layout from './components/layout'
import { createStore } from'redux'
import {Provider} from 'react-redux'
import ProductDetailPage from './components/shop/productdetailpage'
import Signup from './components/login/signup'

import "swiper/css";
import "swiper/css/navigation";  // for navigation arrows
import "swiper/css/pagination";  // for pagination dots

 
import LoginPage from './components/login/loginpage'
import App from './components/app/Appmain'
import Shop from './components/shop/mainshop'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Mainpage from './components/adminpages/adminmainpage'

          import store from '../store/configure'
import ProductCreatePage from './components/adminpages/productmanagment.jsx/productmanagment'

      const  router = createBrowserRouter([
        {path: '/' ,  element: <Layout></Layout>,




          children:[
{path:'/'  , element: <App></App>},
{path:'/shop', element:<Shop></Shop>},

{
  path:'/productdetail/:productId' , element:<ProductDetailPage/>
},
{
  path:"/login" , element:<LoginPage></LoginPage>

}
,
{
  path:"/signup" , element:<Signup></Signup>
}


          ]
        },

          {
            path:'/adminpanel', element:<Mainpage></Mainpage>,
          
            
          },
        {
          path:"/adminpanel/products" ,element:<ProductCreatePage/>
        },
        


















          

      ],

    
  
    
    )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  
  </StrictMode>,
)
