import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f9fbfd] to-[#e3f2fd] px-4 py-10 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 max-w-4xl w-full">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
            Welcome to ShopSmart
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover convenience, quality, and savings in every click.
          </p>
        </div>

        {/* About Content */}
        <div className="text-base sm:text-lg text-gray-700 leading-relaxed space-y-4 mb-6">
          <p>
            <strong>ShopSmart</strong> is your go-to destination for effortless online shopping. We’re
            committed to delivering top-quality products that suit your lifestyle — whether you’re searching
            for trending gadgets, stylish accessories, or reliable daily essentials.
          </p>
          <p>
            What sets us apart is our focus on <strong>customer satisfaction</strong>. From curated selections
            to fast delivery and secure checkout, every feature on our platform is built with your experience
            in mind.
          </p>
        </div>

        {/* Highlight Box */}
        <div className="bg-[#f1f8ff] border-l-4 border-blue-600 p-5 rounded-md text-blue-700 font-medium text-base sm:text-lg mb-6">
          💡 Our Promise: Smart prices. Smart picks. Smart service. <br />
          We're not just another store — we're your partner in smart shopping.
        </div>

        {/* Closing Paragraph */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-10">
          Join thousands of satisfied customers who’ve made the switch to smarter, simpler shopping.
          Whether you're furnishing your space or upgrading your style, <strong>ShopSmart</strong> is here
          to make it happen — beautifully and affordably.
        </p>

        {/* Button */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md shadow-md transition duration-300 transform hover:-translate-y-1"
          >
            🛒 Explore Our Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
