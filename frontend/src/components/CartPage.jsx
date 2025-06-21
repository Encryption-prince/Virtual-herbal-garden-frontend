
import React from "react";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  console.log("cartItems =", cartItems);

  const handleClick = () => {
    navigate("/orders");
  };

  const handleAdd = (index) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, count: item.count + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems
      .map((item, i) =>
        i === index ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0);
    setCartItems(updatedCart);
  };

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.count * item.price,
    0
  );

  return (
    <>
      <nav className="bg-white border-b border-gray-200 text-gray-800 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold text-green-700">
            <a href="/">🌿 VHG</a>
          </div>
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <a href="/" className="hover:text-green-600">Home</a>
            </li>
            <li>
              <a href="/marketPlace" className="hover:text-green-600">Shop</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p>Your cart is empty.</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4"
                >
                  <div className="flex items-center gap-3 w-full sm:w-1/2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-base font-medium text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-xs text-gray-500">{item.type}</p>
                      <p className="text-xs text-gray-500">
                        Seller: {item.seller}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end w-full sm:w-1/2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRemove(index)}
                        className="text-sm px-2 py-1 bg-red-400 text-white rounded"
                      >
                        −
                      </button>
                      <span className="text-base font-semibold">
                        {item.count}
                      </span>
                      <button
                        onClick={() => handleAdd(index)}
                        className="text-sm px-2 py-1 bg-green-500 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-700">
                      ${(item.price || 0).toFixed(2)} each
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      ${(item.count * (item.price || 0)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-xs text-red-600 underline hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Total: ${totalAmount.toFixed(2)}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleClearCart}
                  className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleClick}
                  className="text-sm px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
