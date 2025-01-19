import React, { useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signInfn } from "@/lib/api";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import UserContext from "./Context/ContextApi";

export default function Signin() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    // Use toast.promise to handle loading, success, and error states
    toast.promise(signInfn(formData), {
      loading: "Submitting...",
      success: (response) => {
        if (response.statusCode === 200) {
          // Perform necessary actions
          localStorage.setItem("accessToken", response?.data?.accessToken);
          localStorage.setItem("refreshToken", response?.data?.refreshToken);
          // localStorage.setItem("name", response?.data?.loggedInUser.fullName);
          // localStorage.setItem("email", response?.data?.loggedInUser.email);
          // localStorage.setItem("phone", response?.data?.loggedInUser.phone);
          setUser(response?.data?.loggedInUser);
          console.log("clicked");
          navigate("/", { replace: true });
          window.location.reload();
          return response?.message || "Login successful!";
         
        } else {
          throw new Error(response.response.data.message);
        }
      },
      error: (error) => error.message || "An unexpected error occurred",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-4">
      <Toaster richColors />
      {/* Left Side: Sign-In Form */}
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl w-full max-w-md m-6 backdrop-blur-sm border border-purple-500">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-500 animate-pulse">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-purple-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-gray-800 border-purple-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ref={emailRef}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-purple-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-gray-800 border-purple-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ref={passwordRef}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* Right Side: Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8 m-6 max-w-2xl">
        <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          Light Up Your World!
        </h2>
        <p className="text-gray-300 text-xl mb-8 leading-relaxed">
          Transform your space with vibrant neon lights. Our customizable neon
          signs add a unique touch to any setting, whether it's your home,
          workspace, or event.
        </p>
        <ul className="text-gray-300 text-lg list-none space-y-4 mb-8">
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Custom Designs to suit your style
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Eco-friendly and energy-efficient
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Worldwide shipping available
          </li>
        </ul>
        <p className="text-gray-300 text-lg mt-6 font-semibold">
          Sign in now to track your orders, save your favorite designs, and
          access exclusive offers!
        </p>
      </div>
    </div>
  );
}
