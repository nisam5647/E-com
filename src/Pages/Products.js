import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from '../firebase';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

const sampleProducts = [
  { id: 1, name: "Casio Mens Watch", price: "₹2400.99", image: "https://i.pinimg.com/736x/e1/77/6f/e1776f08d0444cf7ec1aa3a45ea8fd36.jpg" },
  { id: 2, name: "Fossil Mens Watch", price: "₹2900.00", image: "https://zimsonwatches.com/cdn/shop/articles/Fossil-Blog-Image.png?v=1710996978" },
  { id: 3, name: "Headset", price: "₹790.99", image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495" },
  { id: 4, name: "Sun Glass", price: "₹4900.99", image: "https://i.pinimg.com/736x/07/26/a9/0726a99bcdfc6afaadd4ad3eac5652da.jpg" },
  { id: 5, name: "Cap", price: "₹1900.99", image: "https://i.pinimg.com/736x/08/40/5a/08405ad7bedb0261d42dce481df82828.jpg" },
  { id: 6, name: "Wrist Watch", price: "₹5900.00", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: 7, name: "Leather Bag", price: "₹3500.00", image: "https://i.pinimg.com/736x/47/a3/72/47a372295aa19240c5f57f8fe98e0fb0.jpg" },
  { id: 8, name: "Leather key cover", price: "₹599.99", image: "https://i.pinimg.com/736x/30/57/ee/3057eee59c3885646b2766c7f0df070b.jpg" },
];

function Products() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('addedProducts')) || [];
    setNewProducts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('addedProducts', JSON.stringify(newProducts));
  }, [newProducts]);

  useEffect(() => {
    const fetchData = async () => {
      const cartSnap = await getDocs(collection(db, 'cart'));
      setCartItems(cartSnap.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() })));

      const wishSnap = await getDocs(collection(db, 'wishlist'));
      setWishlistItems(wishSnap.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const parsePrice = (price) => parseFloat(price.replace(/[^0-9.]/g, '') || 0);

  const filteredProducts = [...sampleProducts, ...newProducts].filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter ? parsePrice(product.price) <= parseFloat(priceFilter) : true;
    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const addToCart = async (e, product) => {
    e.stopPropagation();
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      const productRef = doc(db, 'cart', existing.firestoreId);
      await updateDoc(productRef, { quantity: existing.quantity + 1 });
      toast.success('Quantity updated');
    } else {
      await addDoc(collection(db, 'cart'), { ...product, quantity: 1 });
      toast.success('Product Added');
    }

    const snapshot = await getDocs(collection(db, 'cart'));
    setCartItems(snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() })));
  };

  const toggleWishlist = async (e, product) => {
    e.stopPropagation();
    const existing = wishlistItems.find(item => item.id === product.id);
    if (existing) {
      await deleteDoc(doc(db, 'wishlist', existing.firestoreId));
      toast.info('Removed from wishlist');
    } else {
      await addDoc(collection(db, 'wishlist'), product);
      toast.success('Added to wishlist');
    }

    const snap = await getDocs(collection(db, 'wishlist'));
    setWishlistItems(snap.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Gadgets</h1>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:w-1/2 px-4 py-2 border rounded" />
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="w-full sm:w-1/2 px-4 py-2 border rounded">
          <option value="">All Prices</option>
          <option value="500">Under ₹500</option>
          <option value="1000">Under ₹1000</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {visibleProducts.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const wishlistItem = wishlistItems.find(item => item.id === product.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition">
              <Link to="/view" state={{ itemdata: product }}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-blue-600 font-medium mt-1">{product.price}</p>
                </div>
              </Link>

              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={(e) => addToCart(e, product)}
                  className="flex-1 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded flex justify-center items-center gap-2"
                >
                  <FaShoppingCart />
                  {quantity > 0 && <span>x{quantity}</span>}
                </button>

                <button
                  onClick={(e) => toggleWishlist(e, product)}
                  className="py-2 px-4 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded flex justify-center items-center"
                >
                  {wishlistItem ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}>Previous</button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}>Next</button>
      </div>
    </div>
  );
}

export default Products;
