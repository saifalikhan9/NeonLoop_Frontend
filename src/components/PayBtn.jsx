import { useState, useContext, useEffect } from "react";
import UserContext from "./Context/ContextApi.js";
import { useNavigate } from "react-router-dom";
import { clearcart, fetchApiKey } from "../lib/api.js";
import axios from "axios";
import { Button } from "./ui/button.jsx";

const PayButn = ({ orderData }) => {
  const [apiKey, setApiKey] = useState("");

  const data = orderData; // there so many red underlines thats why i do this
  const totalAmount = data.reduce((total, order) => total + order.price, 0);
  console.log(totalAmount);

  const userID = data[0]?.userId;
  const orderID = data?.length > 0 ? data?.map((product) => product._id) : null;

  //   const { url, user, token, cart, selectedAddress,clearCart } = useContext(UserContext);
  const { selectedAddress, clearCart } = useContext(UserContext);
  const BackendUrl = import.meta.env.VITE_Url;
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    fetchApiKey()
      .then((data) => {
        setApiKey(data);
      })
      .catch((e) => {
        console.error("Error in fetchApiKey:", e); // Executed when fetchApiKey rejects
      });
  }, []);

  // Assuming you want to use the first order's ID for payment
  //
  const handlePayment = async () => {
    if (!selectedAddress || Object.keys(selectedAddress).length === 0) {
      console.error("No valid address selected.");
      alert("Please select a shipping address before proceeding with payment.");
      return;
    }
    if (!orderID && selectedAddress) {
      console.error("No valid order ID found and select the address");
      return;
    }

    try {
      const res = await axios.post(
        `${BackendUrl}/payment/pay`,
        {
          totalAmount,
          selectedAddress,
          userID,
          data,
          email: localStorage.getItem("email"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: apiKey,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Neon Loop",
        description: `Payment for Order ID: ${orderID}`,
        order_id: res.data.OrderId,
        handler: async (response) => {
          console.log("Payment Success:", response);
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            totalAmount,
            orderItems: orderData,
            userID,
            shippingAddress: selectedAddress,
          };

          try {
            const res = await axios.post(
              `${BackendUrl}/payment/verify`,
              paymentData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.data.success) {
              clearcart();
              navigate("/orders");
              window.location.reload();
            }
          } catch (error) {
            console.log("error", error);
          }
        },
        prefill: {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          contact: localStorage.getItem("phone"),
        },
        notes: {
          email: localStorage.getItem("email"),
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div>
      <Button
        variant="secondary"
        className="w-full my-2 "
        onClick={handlePayment}
      >
        Pay Now
      </Button>
    </div>
  );
};

export default PayButn;
