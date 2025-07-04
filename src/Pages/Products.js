import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc, getDocs } from '../firebase';
import { toast } from 'react-toastify';

const sampleProducts = [
  { id: 1, name: "Casio Mens Watch", price: "$24.99", image: "https://i.pinimg.com/736x/e1/77/6f/e1776f08d0444cf7ec1aa3a45ea8fd36.jpg" },
  { id: 2, name: "Fossil Mens Watch", price: "$299.00", image: "https://zimsonwatches.com/cdn/shop/articles/Fossil-Blog-Image.png?v=1710996978" },
  { id: 3, name: "Headset", price: "$79.99", image: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Rockerz_650_pp_renders_main_banner.124.png?v=1740735495" },
  { id: 4, name: "Sun Glass", price: "$49.99", image: "https://i.pinimg.com/736x/07/26/a9/0726a99bcdfc6afaadd4ad3eac5652da.jpg" },
  { id: 5, name: "Cap", price: "$19.99", image: "https://i.pinimg.com/736x/08/40/5a/08405ad7bedb0261d42dce481df82828.jpg" },
  { id: 6, name: "Wrist Watch", price: "$89.00", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&h=350" },
  { id: 7, name: "Leather Bag", price: "$35.00", image: "https://i.pinimg.com/736x/47/a3/72/47a372295aa19240c5f57f8fe98e0fb0.jpg" },
  { id: 8, name: "Leather key cover", price: "$599.99", image: "https://i.pinimg.com/736x/30/57/ee/3057eee59c3885646b2766c7f0df070b.jpg" },
];

function Products() {
  const [cartItems, setCartItems] = useState([]);
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
    const fetchCart = async () => {
      const snapshot = await getDocs(collection(db, 'cart'));
      const data = snapshot.docs.map(doc => doc.data());
      setCartItems(data);
    };
    fetchCart();
  }, []);

  const parsePrice = (price) => parseFloat(price.replace(/[^0-9.]/g, ''));

  const filteredProducts = [...sampleProducts, ...newProducts].filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = priceFilter ? parsePrice(product.price) <= parseFloat(priceFilter) : true;
    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  const addToCart = async (e, product) => {
    e.stopPropagation();
    const alreadyInCart = cartItems.some(item => item.id === product.id);
    if (!alreadyInCart) {
      await addDoc(collection(db, 'cart'), product);
      setCartItems([...cartItems, product]);
      toast.success('Product Added Successfully');
    }
  };

  const handleProductClick = (product) => {
    const index = newProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
      setForm({ name: product.name, price: product.price, image: product.image });
      setEditIndex(index);
    } else {
      setForm({ name: '', price: '', image: '' });
      setEditIndex(null);
    }
  };

  const handleAddOrUpdateProduct = () => {
    if (!form.name || !form.price || !form.image) return alert("All fields required!");
    const updatedProduct = { id: editIndex !== null ? newProducts[editIndex].id : Date.now(), ...form };

    if (editIndex !== null) {
      const updatedList = [...newProducts];
      updatedList[editIndex] = updatedProduct;
      setNewProducts(updatedList);
      setEditIndex(null);
    } else {
      setNewProducts([...newProducts, updatedProduct]);
    }

    setForm({ name: '', price: '', image: '' });
  };

  const handleDelete = () => {
    if (editIndex !== null) {
      const updated = [...newProducts];
      updated.splice(editIndex, 1);
      setNewProducts(updated);
      setEditIndex(null);
      setForm({ name: '', price: '', image: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Gadgets</h1>

      {/* Search & Filter Controls */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border rounded shadow"
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border rounded shadow"
        >
          <option value="">All Prices</option>
          <option value="500">Under ₹500</option>
          <option value="1000">Under ₹1000</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {visibleProducts.map(product => {
          const isInCart = cartItems.some(item => item.id === product.id);
          return (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer"
            >
              <Link to="/view" state={{ itemdata: product }}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-blue-600 font-medium mt-1">{product.price}</p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={(e) => addToCart(e, product)}
                  disabled={isInCart}
                  className={`mt-2 w-full py-2 rounded transition ${
                    isInCart ? "bg-blue-600 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {isInCart ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>

      {/* Admin Form */}
      <div className="mt-16 max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {editIndex !== null ? '✏️ Edit Product' : '➕ Add New Product'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Price (e.g. $99.99)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddOrUpdateProduct}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
          {editIndex !== null && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
