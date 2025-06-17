import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loadingspinner";

import {Link} from "react-router-dom"
const Shop = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const [brand, setbrand] = useState(null);
  const [priceRange, setpriceRange] = useState(null);
  const [category, setcategory] = useState(null);
  const [results, setresults] = useState([]);
  const [totalpages, settotalpages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [loading, setloading] = useState(false)
  const handlecategory = (item) => {
    setcategory((prev) => (prev === item ? null : item));
    setpageNumber(1)
  };
  const handlebrand = (item) => {
    setbrand((prev) => (prev === item ? null : item));
    setpageNumber(1)
  };
  const handlepriceRange = (item) => {
    setpriceRange((prev) => (prev === item ? null : item));
    setpageNumber(1)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const params = { pageNumber };
      if (brand) params.brand = brand;
      if (category) params.category = category;
      if (priceRange && priceRange !== null) params.priceRange = priceRange;
   setloading(true)

      try {
        const response = await axios.get("http://localhost:8345/get/products", {
          params,
        });

     
console.log(response.data)

        setresults(response.data.data.productoncurrentPage);
        settotalpages(response.data.data.totalPages);
      } catch (error) {
        console.log(error.message);
      }
      finally{
        setloading(false)
      }
    };

    fetchProducts();
  }, [pageNumber, category, brand, priceRange]);

  const brandarray = [
    "Diaz",
    "Elif",
    "SkinSimple",
    "Cervae",
    "Hemani",
    "Aditotin",
    "Landy",
  ];

  const categoryarray = [
    "facewash",
    "EyeCream",
    "EyeLashes",
    "Toner",
    "cleanser",
    "cream",
    "Moisturizer",
    "Lipgloss",
    "Eyeliner",
    "Sunscreen",
  ];

  const priceRangesarray = ["100-200", "200-300", "300-400", "400-500"];

  const handlepageNumber = (item) => {
    setpageNumber(item);
  };

  const clearFilters = () => {
    setbrand(null);
    setcategory(null);
    setpriceRange(null);
    setpageNumber(1)
  };

  let totalpagesarray = [];
  for (let i = 1; i <= totalpages; i++) {
    totalpagesarray.push(i);
  }

  return (
    <>
      {/* Main container */}
      <div className="min-h-screen bg-gray-50">

        {/* Header with hamburger on small screens */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-label="Toggle sidebar"
          >
            {/* Hamburger icon */}
            <svg
              className="w-8 h-8 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <div className="flex">

          {/* Sidebar for md and up */}
          <aside
            className={`
            fixed inset-y-18  left-0 bg-white shadow-md p-4 w-64 overflow-auto
              transform md:translate-x-0
              transition-transform duration-300 ease-in-out
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
              z-40
            `}
          >
            <div className="mb-6 flex justify-between items-center md:hidden">
              <h2 className="text-2xl font-semibold">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Close sidebar"
              >
                &times;
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Choose by Brand</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {brandarray.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => 
                      
                      {handlebrand(item);
                       setSidebarOpen(false)
                      }
                      }


                      
                    
                    
                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                      ${
                        brand === item
                          ? "bg-[#393e46] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Select Category</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {categoryarray.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {handlecategory(item)

                       setSidebarOpen(false)
                    }
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                      ${
                        category === item
                          ? "bg-[#393e46] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Select Price Range (min - max)
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {priceRangesarray.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => 
                      
                      {
                      handlepriceRange(item)
                       setSidebarOpen(false)
                      }
                      
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                      ${
                        priceRange === item
                          ? "bg-[#393e46] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="w-full bg-[#d65a31] hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Overlay behind sidebar when open on small screens */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
            ></div>
          )}

          {/* Main content */}
          <main className="flex-1 min-h-screen pt-4 pb-20 px-4 md:pl-72 md:pr-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">

              {/* Products grid */}
          {/* Products grid */}

          {loading ? (<Loader></Loader>):


(<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {results.length === 0 ? (
    <p className="text-center col-span-full text-gray-500 text-lg mt-20">
      No products found
    </p>
  ) : (
    results.map((item, index) => (
      <Link 
        key={index}
        className="bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-3xl transition-shadow duration-300 flex flex-col"

      to={`/productdetail/${item._id}`}  
      >
       
        {/* Image */}
        {item.images && item.images[0] ? (
          <img
            src={item.images[0]}
            alt={item.name}
            className="object-contain h-80 w-full rounded-t-lg bg-[#dcdcdc]"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400 text-xl">
            No Image
          </div>
        )}
      

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 truncate">
            {item.name}
          </h2>

          <p className="text-sm text-gray-600 mb-1 line-clamp-3">
            Ingredients: {item.ingredients || "N/A"}
          </p>

          <div className="mt-auto space-y-1">
            <p className="text-sm text-gray-700">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Brand:</strong> {item.brand}
            </p>
            <p className="text-lg font-bold text-red">
              <del className="text-red-600 text-sm">${item.price.toFixed(2)}</del> &nbsp; <span className="text-black text-lg">{`$${item.discount}`}</span>
            </p>
            <p className={`text-sm ${item.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {item.stock > 0 ? `In stock: ${item.stock}` : "Out of stock"}
            </p>
          </div>

          {/* Add to Cart button */}
          <button
            disabled={item.stock === 0}
            className={`mt-4 w-full py-2 rounded-md font-semibold text-white transition
              ${
                item.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#d65a31] hover:bg-black "
              }`}
            onClick={() => alert(`Add to cart: ${item.name}`)}
          >
            Add to Cart
          </button>

          </div>
        </Link>
    
    ))
  )}

          
  </div>


)}
              {/* Pagination */}
              <nav
                aria-label="Pagination"
                className="mt-8 flex justify-center flex-wrap gap-2"
              >
                {totalpagesarray.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlepageNumber(item)}
                    className={`px-4 py-2 rounded-md font-medium border transition
                      ${
                        pageNumber === item
                          ? "bg-[#393e46] border-[#393e46] text-white"
                          : "border-gray-300 text-gray-700 hover:bg-blue-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Shop;
