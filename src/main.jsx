import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import Customize from "./components/Customize";
import LandingPage from "./components/LandingPage";
import Signup from "./components/SignUpPage";
import Signin from "./components/SignInPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderDetails from "./components/OrderDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<OrderDetails />} />
      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
