import { useSelector } from "react-redux";
import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteButton from "./deleteButton";
import Minus from "./minus";
import Increment from "./plusicon";
import ClearCart from "./clearcart";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartitems);

  const [loading , setloading] = useState(false)
  const totalprice = useSelector((state) => state.cart.totalPrice);






  if (!cart || cart.length === 0) {
    return (
        <div className="p-6 ">
          <div className="flex flex-col items-center mb-4  border-b-2 py-4">
            <img
              src="./public/cartempty.png"
              alt="Cart Empty"
              className="w-1/4 mb-2"
            />
            <h3 className="text-lg font-bold text-gray-800">
              Your Cart is Empty
            </h3>
              <Link to="/shop" className="text-lg  mt-8 bg-[#cccc] px-4 py-4 rounded-lg hover:text-orange-500 font-bold transition duration-300 text-center">
             Buy something 
              </Link>
            
          </div>

       
        </div>
    );
  }

  console.log(cart)

  return (
    <>
    
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <div className="lg:col-span-2 divide-y divide-gray-200 rounded-xl overflow-hidden bg-white shadow-md">
  {cart.map((item, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-4 py-6"
    >
      {/* Image Box */}
      <div className="w-20 h-20 border border-gray-200 rounded-lg flex items-center justify-center p-1 bg-gray-50 shadow-sm">
        <img
          src={item.images}
          alt={item.name}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 px-4 text-center sm:text-left mt-4 sm:mt-0">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 leading-tight">
          {item.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Price: <span className="text-gray-800 font-semibold">${item.price}</span></p>
      </div>

      {/* Quantity & Remove */}
      <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
        <div className="flex items-center gap-2">
        <Minus productId={item.productId} />
          <span className="text-base font-medium text-gray-700">{item.quantity}</span>
          <Increment productId={item.productId}/>
        </div>
        <DeleteButton productId={item.productId}/>
      </div>
     
    </div>
      
  ))}
   

</div>



    
        <div>
          <div className="card w-full bg-base-100 shadow-md">
            <div className="card-body">
              <span className="badge badge-warning w-fit">Order Summary</span>
              <div className="flex justify-between items-center mt-2">
                <h2 className="text-1xl font-bold">Total</h2>
                <span className="text-2xl font-bold">${totalprice}</span>
              </div>
              <ul className="mt-4 space-y-1 text-sm text-gray-600">
                <li>Includes featured discounts</li>
                <li>Secure payment system</li>
                <li>Free delivery available</li>
              </ul>
              <div className="mt-6">
                <button className=" bg-black btn-primary btn w-full">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   <div className="flex justify-center mt-2">
  <ClearCart  className="text-white bg-red-400" />
</div>

    </>
  );
};

export default Cart;
