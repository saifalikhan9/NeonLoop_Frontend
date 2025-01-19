import { cartDatafn } from "@/lib/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import PayButn from "./PayBtn";
import { toast } from "sonner";

const OrderReviewPage = ({ selectedAddress }) => {
  const [orders, setOrders] = useState([]);
  const orderID =
    orders?.length > 0 ? orders?.map((product) => product._id) : null;

  const fetchOrders = async () => {
    try {
      const res = await cartDatafn();
      console.log(res);
      setOrders(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);



  const totalAmount = orders.reduce((total, order) => total + order.price, 0);

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-white text-xl font-bold mb-4">Order Review</h2>

      <div className="space-y-4  overflow-y-auto pr-2">
        {orders.map((order) => (
          <div key={order._id} className="bg-gray-800 p-4 rounded-lg flex">
            <img
              src={order.imageUrl}
              alt={`Neon sign ${order.text}`}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-white font-semibold">
                {order.text} Neon Sign
              </h3>
              <div className="text-gray-400 text-sm">
                <p>Font: {order.font}</p>
                <p>Color: {order.color}</p>
                <p>Size: {order.size}</p>
              </div>
              <p className="text-white font-bold mt-2">Rs. {order.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between text-white">
          <span>Total Items:</span>
          <span>{orders.length}</span>
        </div>
        <div className="flex justify-between text-white font-bold mt-2">
          <span>Total Amount:</span>
          <span>Rs. {totalAmount}</span>
        </div>
        <PayButn orderData={orders} />
      </div>
    </div>
  );
};

export default OrderReviewPage;
