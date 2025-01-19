import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cartDatafn, deletefn, clearcart } from "@/lib/api";
import { Loader2, Trash2 } from 'lucide-react';
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

  const removeItem = async (id) => {
    try {
      setIsLoading(true);
      await deletefn(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      setCartRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setError("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHandle = async () => {
    try {
      setIsLoading(true);
      await clearcart();
      setCartItems([]);
      setCartRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      setError("Failed to clear cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const cartData = async () => {
    try {
      setIsLoading(true);
      const res = await cartDatafn();
      setCartItems(res.message || []);
    } catch (error) {
      setError("Failed to load cart. Please refresh.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cartData();
  }, [cartRefreshTrigger]);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={cartData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 neon-text">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <p className="text-xl">Your cart is empty</p>
            <p className="mt-2">
              Explore our neon collection and add some items!
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <div className="w-24 h-24 flex-shrink-0 mr-4">
                      <img
                        src={item.imageUrl || "/placeholder-neon.png"}
                        alt={item.text}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      <p className="text-sm text-gray-400">
                        Color: {item.color} | Font: {item.font} | Size: {item.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <span className="mr-4 font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => removeItem(item._id)}
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-xl mb-4 neon-text text-right">
                Total: <span className="font-bold">${total.toFixed(2)}</span>
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button 
                  onClick={clearHandle} 
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                >
                  Clear Cart
                </Button>
                <Link to="/checkout" className="w-full sm:w-auto">
                  <Button className="w-full neon-button">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

