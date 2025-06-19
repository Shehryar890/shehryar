import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../loadingspinner";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,} from 'swiper';
import AddcartButton from "../cart/addtocartbutton";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ProductDetailPage = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [suggestions, setsuggestions] = useState([])

  // New state to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Magnifier related states ---
  const [showLens, setShowLens] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8345/get/productdetails/${productId}`
        );
        setData(response.data.product);
        setSuccess(response.data.message);
        setError(null);
        setCurrentImageIndex(0); // Reset image index on new product load
      } catch (error) {
        setError(error.message || "Failed to fetch product");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

 

    fetchProductDetail();
  }, [productId]);


  // Keyboard event handler for left/right arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!data || !data.images || data.images.length === 0) return;

      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev < data.images.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data]);




     useEffect(()=>{
      console.log("Calling similar API with:", productId);

const suggestion = async()=>{
      try{
        
        
        const response  = await axios.get(`http://localhost:8345/get/similar/${productId}`)
        setsuggestions ( response.data)
     console.log(response.data)


      }
      catch(error){
        console.log("Error response:", error.response?.config?.url);

        console.log(error)
     
      }

    }
    suggestion()
     } , [productId])

  if (loading) return <Loader />;

  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  if (!data) return <p className="text-center mt-10">No product found.</p>;

  const {
    name,
    description,

    category,
    brand,
    images,
    stock,
    sold,
    discountoffer,
    averageRating,
    totalReviws,
    ingredients,
    discount,
    views,
    purchase,
    addtoCartCount,
  } = data;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} color="#FFC107" size={30} />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} color="#FFC107" size={30} />);
      } else {
        stars.push(<FaRegStar key={i} color="#FFC107" size={30} />);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };




   
  // Handlers for prev/next buttons
  const goPrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // --- Magnifier logic ---
  const lensSize = 150; // lens width and height in px
  const zoomLevel = 2; // magnification

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    // Calculate cursor position relative to the image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Clamp x and y within the image bounds
    x = Math.max(lensSize / 2, Math.min(x, rect.width - lensSize / 2));
    y = Math.max(lensSize / 2, Math.min(y, rect.height - lensSize / 2));

    setLensPosition({ x, y });
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  // Calculate background position for zoomed image inside lens
  const backgroundX = -lensPosition.x * zoomLevel + lensSize / 2;
  const backgroundY = -lensPosition.y * zoomLevel + lensSize / 2;

  return (
    <>
    <div className="max-w-6xl mx-auto p-6 sm:p-10">
      <div className="bg-[#F5F5F5] shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row gap-8">
        {/* Images Section */}
        <div className="md:w-1/2 flex flex-col space-y-4 p-4 relative">
          {images && images.length > 0 ? (
            <>
              <div
                style={{ position: "relative" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`Product Image ${currentImageIndex + 1}`}
                  className="rounded-lg w-full h-64 md:h-full object-contain bg-white b-b-2"
                  ref={imageRef}
                  draggable={false}
                />
                {/* Lens */}
                {showLens && (
                  <div
                    ref={lensRef}
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      top: lensPosition.y - lensSize / 2,
                      left: lensPosition.x - lensSize / 2,
                      width: lensSize,
                      height: lensSize,
                      borderRadius: "50%",
                      border: "2px solid #000",
                      backgroundColor: "rgba(255,255,255,0.3)",
                      backgroundImage: `url(${images[currentImageIndex]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${imageRef.current
                        ? imageRef.current.width * zoomLevel
                        : 0}px ${
                        imageRef.current ? imageRef.current.height * zoomLevel : 0
                      }px`,
                      backgroundPosition: `${backgroundX}px ${backgroundY}px`,
                      boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                    }}
                  />
                )}
              </div>

              {/* Prev Button */}
              <button
                onClick={goPrev}
                disabled={currentImageIndex === 0}
                className={`absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  currentImageIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }`}
                aria-label="Previous Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goNext}
                disabled={currentImageIndex === images.length - 1}
                className={`absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  currentImageIndex === images.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }`}
                aria-label="Next Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          ) : (
            <div className="bg-gray-200 rounded-lg w-full h-64 flex items-center justify-center">
              <span className="text-gray-500">No images available</span>
            </div>
          )}

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-2 overflow-x-auto">
            {images &&
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-contain rounded border-2 cursor-pointer ${
                    index === currentImageIndex ? "border-indigo-500" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  draggable={false}
                />
              ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-start space-y-6">
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className="text-gray-600">{description}</p>

          <div className="flex items-center space-x-4">
            <p className="text-xl font-bold text-indigo-600">${discount}</p>
           
          </div>

          {category && (
            <p>
              <span className="font-semibold">Category:</span> {category}
            </p>
          )}
          {brand && (
            <p>
              <span className="font-semibold">Brand:</span> {brand}
            </p>
          )}

          {stock !== undefined && (
            <p>
              <span className="font-semibold">Stock:</span> {stock}
            </p>
          )}
          {sold !== undefined && (
            <p>
              <span className="font-semibold">Sold:</span> {sold}
            </p>
          )}

          {/* Ratings */}
          <div>
            {averageRating !== undefined && (
              <div className="flex items-center space-x-2">
                {renderStars(averageRating)}
                <span className="text-gray-600">
                  ({totalReviws || 0} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Ingredients */}
          {ingredients && (
            <div>
              <h3 className="font-semibold">Ingredients:</h3>
              <p className="text-gray-700">{ingredients}</p>
            </div>
          )}

          {/* Views and Purchase */}
          <div className="flex space-x-4">
            {views !== undefined && (
              <p>
                <span className="font-semibold">Views:</span> {views}
              </p>
            )}
            {purchase !== undefined && (
              <p>
                <span className="font-semibold">Purchase:</span> {purchase}
              </p>
            )}
          </div>
           < AddcartButton productId={productId} />

          {/* Add to Cart Count */}
        

          {/* Discount */}
        
        </div>
      </div>
    </div>


   {/* Swiper for similar products */}
    {suggestions?.products && suggestions.products.length > 0 && (
  <div className="max-w-full mx-auto mt-10 p-4 bg-[#F5F5F5] shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Products Related</h2>

    <Swiper
  spaceBetween={24}
  slidesPerView={1}
  modules={[Pagination, Navigation]}
  pagination={{ 

    clickable: true,
  el: '.custom-swiper-pagination'
  }}

  
  grabCursor={true}
  freeMode={true} // 👈 enables free dragging
  className="pb-10"
  breakpoints={{
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 4 },
  }}
>

      {suggestions.products.map((item, index) => (
        <SwiperSlide key={index}>
          <Link to={`/productdetail/${item._id}`}>
            <div className="bg-[#fafafa] hover:shadow-xl transition-shadow duration-300 rounded-xl p-4 h-full flex flex-col justify-between border border-gray-200">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="h-40 w-full object-contain rounded-md bg-gray-100 mb-4"
              />
              <div className="flex flex-col space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description?.slice(0, 60)}...</p>
                <p className="text-indigo-600 font-bold mt-1">${item.price}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="custom-swiper-pagination mt-8 text-gray-950 flex justify-center"></div>
  </div>
)}




    </>
  );
};

export default ProductDetailPage;
