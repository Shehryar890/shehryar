import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const SwipeImages = [
    {
      id: 1,
      leftImg: '/slide1left.jpg',
      rightImg: '/sgsf.jpg',
      heading: 'Discover the secret of luminous skin',
      para:"Your skin regenerates and repairs itself while you sleep, making nighttime the perfect time to boost your skincare routine."
    },
    {
      id: 2,
      leftImg: '/slide2left.jpg',
      rightImg: '/slide1right.jpg',
      heading: 'Unlock the power of natural ingredients',
      para:"Hydration is one of the key factors in maintaining healthy, glowing skin"
    },
    {
      id: 3,
      leftImg: '/slide3left.jpg',
      rightImg: '/slide3right.jpg',
      heading: 'Experience the ultimate beauty experience',
      para:'UV radiation, and smoke. Free radicals can accelerate skin aging, leading to wrinkles, fine lines, and dark spots. Including '
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex); // Use `realIndex` for loop compatibility
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        slidesPerView={1} // Show only 1 slide at a time
        spaceBetween={0} // No space between slides
        centeredSlides={true} // Center the active slide
        loop={true} // Enable loop
        onSlideChange={handleSlideChange} // Update active index on slide change
        pagination={{ clickable: true }} // Show pagination
        keyboard={{
          enabled: true,
          onlyInViewport: true, // Enable keyboard navigation only when Swiper is in viewport
        }}
        className="w-full h-full"
      >
        {SwipeImages.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full flex items-center justify-center">
            {/* Left Image */}
            <div
              className={`absolute left-0 top-0 w-1/4 object-contain  xs:w-11 xs:h-14  md:object-cover  md:w-1/3  h-24 md:h-full bg-cover bg-center transition-all duration-500 ${
                activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
              }`}
              style={{
                backgroundImage: `url(${slide.leftImg})`,
                objectFit: 'contain',
                height: '100%',
              }}
            ></div>

            {/* Center Content (Fixed) */}
            <div
              className={`absolute w-full md:w-1/3 h-full flex flex-col items-center justify-center text-center  bg-opacity-20 bg-purple-200  p-4 shadow-md rounded-lg ${
                activeIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className='font-sm font-bold text-slate-500 mb-10   font-bold font-nunito'>For beauty of youth</p>
              <h2 className="text-5xl  font-bold   mb-20   font-serif text-gray-800">{slide.heading}</h2>

              <p className="text-lg font-semibold text-orange-950 capitalize font-semibold  font-nunito"> {slide.para}</p>
              <button className="mt-4 px-4 py-2  bg-[#ea445a] text-white rounded-lg px-5 py-3 text-sm rounded     hover:bg-orange-600 mt-36    ">
                Shop Now
              </button>
            </div>

            {/* Right Image */}
            <div
              className={`absolute right-0 top-0 w-full md:w-1/3 h-full bg-cover bg-center transition-all duration-500 ${
                activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'
              }`}
              style={{
                backgroundImage: `url(${slide.rightImg})`,
                objectFit: 'cover',
                height: '100%',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
