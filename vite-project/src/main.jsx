import { Children, StrictMode } from 'react'
import { createRoot  } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
 import Layout from './components/layout'
import { createStore } from'redux'
import {Provider} from 'react-redux'
import Signup from './components/login/signup'
 
import LoginPage from './components/login/loginpage'
import App from './components/app/Appmain'
import Shop from './components/shop/mainshop'
import MenProducts from './components/shop/menproduct'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Mainpage from './components/adminpages/adminmainpage'

          import store from '../store/configure'
import ProductCreatePage from './components/adminpages/productmanagment.jsx/productmanagment'

      const  router = createBrowserRouter([
        {path: '/' ,  element: <Layout></Layout>,




          children:[
{path:'/'  , element: <App></App>},
{path:'/shop', element:<Shop></Shop>},
{path:'/shop/:categoryName' , element: <MenProducts></MenProducts>

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
