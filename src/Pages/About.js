import React from 'react';

function About() {
  return (
    <div
      style={{
        fontFamily: 'Segoe UI, sans-serif',
        padding: '80px 20px',
        background: 'linear-gradient(to right, #f9fbfd, #e3f2fd)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '50px',
          borderRadius: '16px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
          maxWidth: '850px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '42px', color: '#0d6efd', marginBottom: '10px' }}>
            Welcome to ShopSmart
          </h1>
          <p style={{ fontSize: '20px', color: '#555' }}>
            Discover convenience, quality, and savings in every click.
          </p>
        </div>

        <div style={{ fontSize: '18px', color: '#333', lineHeight: '1.8', marginBottom: '25px' }}>
          <p>
            <strong>ShopSmart</strong> is your go-to destination for effortless online shopping. We’re
            committed to delivering top-quality products that suit your lifestyle — whether you’re searching
            for trending gadgets, stylish accessories, or reliable daily essentials.
          </p>
          <br />
          <p>
            What sets us apart is our focus on **customer satisfaction**. From curated selections to fast
            delivery and secure checkout, every feature on our platform is built with your experience in mind.
          </p>
        </div>

        <div
          style={{
            background: '#f1f8ff',
            borderLeft: '5px solid #0d6efd',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '30px',
            color: '#0d6efd',
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '1.6',
          }}
        >
          💡 Our Promise: Smart prices. Smart picks. Smart service. <br />
          We're not just another store — we're your partner in smart shopping.
        </div>

        <p style={{ fontSize: '18px', color: '#333', lineHeight: '1.8', marginBottom: '35px' }}>
          Join thousands of satisfied customers who’ve made the switch to smarter, simpler shopping.
          Whether you're furnishing your space or upgrading your style, <strong>ShopSmart</strong> is here
          to make it happen — beautifully and affordably.
        </p>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 35px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: '#0d6efd',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(13, 110, 253, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0b5ed7';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(13, 110, 253, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#0d6efd';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(13, 110, 253, 0.3)';
            }}
          >
            🛒 Explore Our Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
