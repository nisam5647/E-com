import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Stylish Watches',
    text: 'Explore timeless pieces for every moment.',
    image: 'https://i.pinimg.com/1200x/da/17/2b/da172ba2a8de6ce3ffd3494edac07510.jpg',
  },
  {
    id: 2,
    title: 'Headphones & Sound',
    text: 'Premium audio accessories you’ll love.',
    image: 'https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495',
  },
  {
    id: 3,
    title: 'Trendy Eyewear',
    text: 'Elevate your style with modern shades.',
    image: 'https://i.pinimg.com/736x/07/26/a9/0726a99bcdfc6afaadd4ad3eac5652da.jpg',
  },
];

function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="text-sm md:text-lg mb-6 max-w-xl">{slide.text}</p>
            <Link to="/Products">
              <button className="bg-gradient-to-r from-blue-600 via-indigo-800 to-red-700 px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition">
                🛒 Shop Now
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Left/Right Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrent((current + 1) % slides.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? 'bg-white' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Home;
