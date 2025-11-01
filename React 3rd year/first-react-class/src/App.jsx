import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Menu, X, ArrowLeft, CreditCard, Loader, CheckCircle, Wifi } from 'lucide-react';

// --- Assets and Data ---

// Placeholder URLs for uploaded images to match the visual theme
const ASSET_URLS = {
  HERO_BG: 'https://placehold.co/1200x800/202c4b/ffffff?text=Sky+Cafe+Interior', // Based on 215427.jpg
  LOGO: 'https://placehold.co/100x100/ADD8E6/01264B?text=Sky+Cafe', // Based on 215349.jpg logo
  PIZZA: 'https://placehold.co/200x150/ffdd66/000?text=Veg+Pizza', // Based on 215414.jpg
  SANDWICH: 'https://placehold.co/200x150/FFA07A/000?text=Toasted+Sandwich',
  BURGER: 'https://placehold.co/200x150/90EE90/000?text=Burger',
  MOMOS: 'https://placehold.co/200x150/d3d3d3/000?text=Steamed+Momos',
  SHAKE: 'https://placehold.co/200x150/B0E0E6/000?text=Chocolate+Shake',
  MOJITO: 'https://placehold.co/200x150/00CED1/000?text=Blue+Mojito',
  MAGGIE: 'https://placehold.co/200x150/f0e68c/000?text=Veg+Maggie'
};

const MENU_ITEMS = [
  // Pulled data from Screenshot 2025-10-14 215450.jpg and 215506.jpg
  { id: 'maggie-s', category: 'Maggie', name: 'Simple Maggie', price: 80, imageUrl: ASSET_URLS.MAGGIE },
  { id: 'maggie-v', category: 'Maggie', name: 'Veggie Maggie', price: 100, imageUrl: ASSET_URLS.MAGGIE },
  { id: 'momos-v', category: 'Momos', name: 'Veg Momos', price: 70, imageUrl: ASSET_URLS.MOMOS },
  { id: 'momos-p', category: 'Momos', name: 'Paneer Momos', price: 90, imageUrl: ASSET_URLS.MOMOS },
  { id: 'pizza-m', category: 'Pizza', name: 'Margarita Pizza', price: 90, imageUrl: ASSET_URLS.PIZZA },
  { id: 'pizza-c', category: 'Pizza', name: 'Corn Cheese Pizza', price: 110, imageUrl: ASSET_URLS.PIZZA },
  { id: 'sandwich-v', category: 'Sandwich', name: 'Veg Sandwich', price: 80, imageUrl: ASSET_URLS.SANDWICH },
  { id: 'sandwich-p', category: 'Sandwich', name: 'Paneer Sandwich', price: 100, imageUrl: ASSET_URLS.SANDWICH },
  { id: 'burger-v', category: 'Burger', name: 'Veg Burger', price: 70, imageUrl: ASSET_URLS.BURGER },
  { id: 'burger-c', category: 'Burger', name: 'Cheese Burger', price: 100, imageUrl: ASSET_URLS.BURGER },
  { id: 'shake-c', category: 'Shake', name: 'Chocolate Shake', price: 90, imageUrl: ASSET_URLS.SHAKE },
  { id: 'shake-o', category: 'Shake', name: 'Oreo Shake', price: 110, imageUrl: ASSET_URLS.SHAKE },
  { id: 'mojito-g', category: 'Mojito', name: 'Green Apple Mojito', price: 80, imageUrl: ASSET_URLS.MOJITO },
  { id: 'mojito-b', category: 'Mojito', name: 'Blueberry Mojito', price: 80, imageUrl: ASSET_URLS.MOJITO },
  { id: 'coffee-h', category: 'Coffee', name: 'Hot Coffee', price: 50, imageUrl: 'https://placehold.co/200x150/E9967A/000?text=Hot+Coffee' },
];

const CATEGORIES = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

// --- Utility Components ---

const Button = ({ children, onClick, primary = true, icon: Icon, className = '', disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold text-lg
      transition-all duration-300 transform active:scale-95
      ${primary
        ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
        : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'shadow-blue-500/50 hover:shadow-xl'}
      ${className}
    `}
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span>{children}</span>
  </button>
);

const IconButton = ({ icon: Icon, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full text-white bg-blue-600/80 hover:bg-blue-600 transition duration-200 transform active:scale-90 shadow-lg ${className}`}
  >
    <Icon className="w-6 h-6" />
  </button>
);

// --- Page Components ---

// 1. Hero Section (Home Page)
const HeroSection = ({ navigateTo }) => (
  <div className="relative h-screen flex flex-col justify-center items-center text-white p-4">
    {/* Hero Background with subtle animation */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${ASSET_URLS.HERO_BG})`,
        filter: 'brightness(0.4)',
        backgroundAttachment: 'fixed'
      }}
    ></div>
    
    {/* Animated Decorative Overlays (representing vines and lights) */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-3 h-20 bg-pink-300/50 animate-wave-1"></div>
        <div className="absolute top-0 right-1/3 w-3 h-24 bg-teal-300/50 animate-wave-2 delay-300"></div>
        <div className="absolute top-0 left-1/2 w-4 h-28 bg-white/50 animate-wave-3 delay-600"></div>
    </div>


    <div className="relative text-center max-w-2xl animate-fadeIn">
      <div className="flex justify-center mb-4">
        <img src={ASSET_URLS.LOGO} alt="Sky Cafe Logo" className="w-32 h-32 rounded-full border-4 border-white shadow-2xl transition-all duration-500 hover:scale-105" />
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold mb-4 font-serif text-shadow-lg tracking-wider transition-all duration-500 hover:text-teal-300">
        Sky Cafe
      </h1>
      <p className="text-xl md:text-2xl mb-8 font-light italic transition-all duration-700 hover:tracking-widest">
        For The Love Of Delicious Food. Pure Veg.
      </p>
      <Button onClick={() => navigateTo('menu')} primary={true} icon={Menu}>
        View Menu & Order
      </Button>
    </div>
  </div>
);

// 2. Menu Item Card
const MenuItemCard = ({ item, addItemToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 transform hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}`}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/ADD8E6/01264B?text=Food+Item'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-xl font-bold text-teal-700 mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{item.category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-2xl font-extrabold text-blue-600">
            ₹{item.price}
          </span>
          <Button
            onClick={() => {
              addItemToCart(item);
              // Simple pop animation feedback
              const button = document.getElementById(`add-btn-${item.id}`);
              button.classList.add('animate-pop');
              setTimeout(() => button.classList.remove('animate-pop'), 500);
            }}
            primary={true}
            className="!px-4 !py-2 !text-base !font-medium"
            id={`add-btn-${item.id}`}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

// 3. Menu Page
const MenuPage = ({ cart, addItemToCart, navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-sky-50 p-4 md:p-8 relative">
      <div className="flex justify-between items-center sticky top-0 bg-sky-50/95 py-4 z-10 shadow-md rounded-b-xl mb-4">
        <IconButton icon={ArrowLeft} onClick={() => navigateTo('home')} className="!bg-teal-600" />
        <h2 className="text-3xl font-bold text-teal-800 transition-colors duration-300 hover:text-blue-600">Full Menu</h2>
        <IconButton icon={ShoppingCart} onClick={() => navigateTo('cart')} className="relative">
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pingOnce">
              {cart.length}
            </span>
          )}
        </IconButton>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 sticky top-[4.5rem] bg-sky-50/95 py-3 z-10">
        <input
          type="text"
          placeholder="Search for Pizza, Momos, Shake..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-full border-2 border-teal-300 shadow-inner focus:ring-2 focus:ring-blue-500 transition duration-300 text-gray-700"
        />

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105
                ${activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/50'
                  : 'bg-white text-teal-700 border border-teal-300 hover:bg-teal-50'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} addItemToCart={addItemToCart} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-2xl text-gray-500">No items found for "{searchTerm}" in {activeCategory}.</p>
          </div>
        )}
      </div>

    </div>
  );
};


// 4. Cart Page
const CartPage = ({ cart, updateCartItemQuantity, removeItemFromCart, navigateTo }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05; // 5% tax
  const total = subtotal + taxes;

  // Animation class for items appearing
  const fadeIn = 'animate-fadeInRight';

  return (
    <div className="min-h-screen bg-sky-50 p-4 md:p-8">
      <div className="flex items-center sticky top-0 bg-sky-50/95 py-4 z-10 shadow-md rounded-b-xl mb-6">
        <IconButton icon={ArrowLeft} onClick={() => navigateTo('menu')} className="!bg-teal-600 mr-4" />
        <h2 className="text-3xl font-bold text-teal-800">Your Order</h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg animate-fadeIn">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty!</p>
          <Button onClick={() => navigateTo('menu')} primary={false} className="mt-6 !text-lg">
            Start Ordering
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={item.id} className={`flex items-center bg-white p-4 rounded-xl shadow-md transition-all duration-300 ${fadeIn}`}>
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-200" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-teal-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition duration-150"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-lg text-blue-600">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition duration-150"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 transition duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl sticky top-20 h-fit animate-fadeInDown">
            <h3 className="text-2xl font-bold text-teal-800 border-b pb-3 mb-4">Order Summary</h3>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-3">
                <span>Taxes (5%):</span>
                <span className="font-medium text-red-500">₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 text-2xl font-extrabold text-blue-600">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              onClick={() => navigateTo('payment')}
              primary={true}
              icon={CreditCard}
              className="w-full mt-6 !text-xl animate-pulseOnce"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


// 5. Payment Page (Simulated)
const PaymentPage = ({ cart, navigateTo, clearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05;
  const total = subtotal + taxes;

  const handlePayment = () => {
    if (cart.length === 0) {
      // Should not happen if coming from cart, but as a guard
      navigateTo('menu');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      // Clear the cart after a successful transaction
      setTimeout(() => clearCart(), 1000);
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center p-4">
        <CheckCircle className="w-24 h-24 text-green-600 mb-6 animate-pop" />
        <h2 className="text-4xl font-extrabold text-green-700 mb-4 animate-fadeInDown">Order Successful!</h2>
        <p className="text-xl text-gray-600 mb-8 text-center animate-fadeIn delay-500">
          Your order of **₹{total.toFixed(2)}** has been placed and is being prepared.
        </p>
        <p className="text-lg text-gray-500 italic mb-10">Thank you for ordering from Sky Cafe!</p>
        <Button onClick={() => navigateTo('home')} primary={true} className="!bg-teal-600">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 p-4 md:p-8">
      <div className="flex items-center sticky top-0 bg-sky-50/95 py-4 z-10 shadow-md rounded-b-xl mb-6">
        <IconButton icon={ArrowLeft} onClick={() => navigateTo('cart')} className="!bg-teal-600 mr-4" />
        <h2 className="text-3xl font-bold text-teal-800">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form (Simulated) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-2xl animate-fadeInLeft">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Payment Method</h3>

          <div className="flex space-x-4 mb-6">
            {['Card', 'UPI', 'Cash'].map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 p-3 rounded-lg text-lg font-semibold border-2 transition-all duration-200 ${
                  paymentMethod === method
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number (simulated)"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              disabled={paymentMethod !== 'Card' || isProcessing}
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
                disabled={paymentMethod !== 'Card' || isProcessing}
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
                disabled={paymentMethod !== 'Card' || isProcessing}
              />
            </div>

            <input
              type="text"
              placeholder="Name on Card"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
              disabled={paymentMethod !== 'Card' || isProcessing}
            />
          </div>
        </div>

        {/* Order Details & Pay Button */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl sticky top-20 h-fit animate-fadeInRight">
          <h3 className="text-2xl font-bold text-teal-800 border-b pb-3 mb-4">Final Amount</h3>
          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span>Taxes (5%):</span>
              <span className="font-medium text-red-500">₹{taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 text-3xl font-extrabold text-blue-600">
              <span>Payable:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            onClick={handlePayment}
            primary={true}
            icon={isProcessing ? Loader : CreditCard}
            disabled={isProcessing}
            className={`w-full mt-6 !text-xl ${isProcessing ? 'animate-pulse' : 'animate-bounceOnce'}`}
          >
            {isProcessing ? 'Processing...' : `Pay Now (₹${total.toFixed(2)})`}
          </Button>
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---

const App = () => {
  // Use a simple string to manage navigation between views
  const [currentPage, setCurrentPage] = useState('home');
  // Cart state: [{ id, name, price, quantity, imageUrl }]
  const [cart, setCart] = useState([]);

  // Mock Firebase/Global State setup (simplified for single file)
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  useEffect(() => {
    console.log(`App running under ID: ${appId}`);
    // Simulate user being connected (the Wifi icon is a nod to this)
  }, [appId]);


  const addItemToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);
      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(i => i.id !== itemId);
      }
      return prevCart.map(i =>
        i.id === itemId ? { ...i, quantity: newQuantity } : i
      );
    });
  };

  const removeItemFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage cart={cart} addItemToCart={addItemToCart} navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage cart={cart} updateCartItemQuantity={updateCartItemQuantity} removeItemFromCart={removeItemFromCart} navigateTo={navigateTo} />;
      case 'payment':
        return <PaymentPage cart={cart} navigateTo={navigateTo} clearCart={clearCart} />;
      case 'home':
      default:
        return <HeroSection navigateTo={navigateTo} />;
    }
  };

  return (
    // Tailwind CSS global setup and custom styles/animations
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f0f9ff; /* sky-50 */
        }
        
        /* Custom Keyframes */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes wave1 {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(10px) scale(1.05); opacity: 0.9; }
          100% { transform: translateY(0) scale(1); opacity: 0.8; }
        }
        @keyframes wave2 {
          0% { transform: translateY(0) scale(1.05); opacity: 0.7; }
          50% { transform: translateY(-10px) scale(1); opacity: 0.8; }
          100% { transform: translateY(0) scale(1.05); opacity: 0.7; }
        }
        @keyframes wave3 {
          0% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(15px); opacity: 0.7; }
          100% { transform: translateY(0); opacity: 0.9; }
        }

        /* Utility Classes for Animation */
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-pop { animation: pop 0.5s ease-in-out; }
        .animate-wave-1 { animation: wave1 6s infinite alternate; }
        .animate-wave-2 { animation: wave2 7s infinite alternate; }
        .animate-wave-3 { animation: wave3 5s infinite alternate; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-600 { animation-delay: 0.6s; }
        
        /* Specific once-off animations for buttons/feedback */
        .animate-pulseOnce {
            animation: pulse 1s 1 ease-in-out;
        }
        .animate-bounceOnce {
            animation: bounce 1s 1;
        }
        .text-shadow-lg {
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
        }
        
        /* Customize scrollbar for a cleaner look */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #38bdf8; /* sky-400 */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #0ea5e9; /* sky-500 */
        }

      `}</style>

      <div className="min-h-screen">
        {renderPage()}

        {/* Floating Cart Button (only on non-cart/payment pages) */}
        {(currentPage === 'home' || currentPage === 'menu') && cart.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <IconButton
              icon={ShoppingCart}
              onClick={() => navigateTo('cart')}
              className="w-16 h-16 !p-3 !bg-red-500 hover:!bg-red-600 shadow-2xl shadow-red-500/50 animate-bounce transition-transform"
            >
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            </IconButton>
          </div>
        )}
        
        {/* Footer/Meta */}
        <div className="text-center py-4 text-xs text-gray-500 bg-white border-t">
            <p>Sky Cafe Demo App | App ID: {appId} | <Wifi className="inline w-3 h-3 text-blue-500"/> Online</p>
        </div>
      </div>
    </>
  );
};

export default App;
