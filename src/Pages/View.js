import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from '../firebase';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const View = () => {
  const location = useLocation();
  const { itemdata } = location.state;

  const [quantity, setQuantity] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  const priceValue = parseFloat(itemdata.price.replace(/[^0-9.]/g, '')) || 0;
  const totalPrice = (priceValue * (quantity || 1)).toFixed(2);

  // Check cart and wishlist on mount
  useEffect(() => {
    const checkData = async () => {
      const cartSnap = await getDocs(collection(db, 'cart'));
      const cartItems = cartSnap.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data()
      }));
      const cartItem = cartItems.find(item => item.id === itemdata.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
        setCartId(cartItem.firestoreId);
      }

      const wishSnap = await getDocs(collection(db, 'wishlist'));
      const wishItems = wishSnap.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data()
      }));
      const wishItem = wishItems.find(item => item.id === itemdata.id);
      if (wishItem) {
        setIsInWishlist(true);
        setWishlistId(wishItem.firestoreId);
      }
    };

    checkData();
  }, [itemdata.id]);

  const handleAddToCart = async () => {
    if (cartId) {
      await updateDoc(doc(db, 'cart', cartId), { quantity: quantity + 1 });
      setQuantity(prev => prev + 1);
      toast.success('Quantity updated');
    } else {
      const newDoc = await addDoc(collection(db, 'cart'), { ...itemdata, quantity: 1 });
      setCartId(newDoc.id);
      setQuantity(1);
      toast.success('Product added to cart');
    }
  };

  const toggleWishlist = async () => {
    if (isInWishlist && wishlistId) {
      await deleteDoc(doc(db, 'wishlist', wishlistId));
      setIsInWishlist(false);
      setWishlistId(null);
      toast.info('Removed from wishlist');
    } else {
      const newDoc = await addDoc(collection(db, 'wishlist'), itemdata);
      setIsInWishlist(true);
      setWishlistId(newDoc.id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        
        {/* Left - Image */}
        <div className="md:w-1/2 w-full h-72 md:h-auto">
          <img
            src={itemdata.image}
            alt={itemdata.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{itemdata.name}</h2>
            <p className="text-gray-600 mb-4">
              Premium quality. Carefully selected for your lifestyle. Add your full product details here.
            </p>
            <p className="text-md text-gray-500 mb-2">Price per Unit: ₹{priceValue.toFixed(2)}</p>
            <p className="text-xl text-blue-700 font-semibold mb-6">
              Total: ₹{totalPrice}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded flex justify-center items-center gap-2"
            >
              <FaShoppingCart />
              {quantity > 0 && <span>x{quantity}</span>}
            </button>

            <button
              onClick={toggleWishlist}
              className="w-full py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded flex justify-center items-center gap-2"
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
              <span>{isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
