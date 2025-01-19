import React, { useContext, useEffect, useState } from "react";
import UserContext from "./Context/ContextApi";
import { orderFetch } from "@/lib/api";
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { user } = useContext(UserContext);

  const fetch = async () => {
    try {
      const res = await orderFetch();
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [user]);

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto p-3 sm:p-4 md:p-6 max-w-4xl text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
          Order History
        </h1>
        {orders?.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="mb-4 sm:mb-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Order #{order.orderId.slice(-6)}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => toggleOrderDetails(order._id)}
                  className="text-blue-400 hover:text-blue-300 transition-colors focus:outline-none p-1"
                >
                  {expandedOrder === order._id ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
              </div>
              {expandedOrder === order._id && (
                <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-800">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">Status:</span>{" "}
                      <span className={`capitalize ${order.payStatus === "paid" ? "text-green-400" : "text-red-400"}`}>
                        {order.payStatus}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-gray-300">Total:</span>{" "}
                      <span className="text-white font-semibold">₹{order.amount}</span>
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 space-y-2 text-gray-300 bg-gray-900 p-3 sm:p-4 rounded-md">
                    <p className="text-sm break-all">
                      <span className="font-medium text-gray-200">Payment ID:</span> {order.paymentId}
                    </p>
                    <div>
                      <p className="text-sm font-medium mb-1 text-gray-200">Shipping Address:</p>
                      <p className="text-xs sm:text-sm">{order.shippingAddress.addressLine}</p>
                      <p className="text-xs sm:text-sm">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                      </p>
                      <p className="text-xs sm:text-sm">{order.shippingAddress.country}</p>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium my-3 sm:my-4 text-gray-200">Order Items</h3>
                  <div className="space-y-3">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex items-start space-x-3 sm:space-x-4 bg-gray-900 p-2 sm:p-3 rounded-md shadow-sm">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt="Product"
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
                          onClick={() => handleImageClick(item.imageUrl)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-200 break-words">{item.text}</p>
                          <p className="text-xs text-gray-400">
                            {item.font}, {item.color}, {item.size}
                          </p>
                          <p className="text-xs text-gray-300">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center">No orders found.</p>
        )}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative w-full max-w-4xl">
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;