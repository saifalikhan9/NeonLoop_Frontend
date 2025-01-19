import React, { useState, useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signupfn } from "@/lib/api";
import UserContext from "./Context/ContextApi";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {user, setUser } = useContext(UserContext);

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      fullName: fullNameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    const res = await signupfn(formData);
    if (res.statusCode === 200) {
      // Show toast and wait for it to be visible
      toast.success(res?.message, {
        duration: 2000, // Show for 2 seconds
        onAutoClose: () => {
          setUser(res.data);
          navigate("/");
        }
      });
    } else {
      toast.error(res?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-4">
      <Toaster richColors/>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl w-full max-w-md m-6 backdrop-blur-sm border border-purple-500">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-500 animate-pulse neon-text">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName" className="text-purple-300">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              className="bg-gray-800 border-purple-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ref={fullNameRef}
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-purple-300">Email</Label>
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
            <Label htmlFor="phone" className="text-purple-300">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="bg-gray-800 border-purple-500 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ref={phoneRef}
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-purple-300">Password</Label>
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 neon-button"
          >
            Sign Up
          </Button>
        </form>
      </div>
      
      {/* Right Side: Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-8 m-6 max-w-2xl">
        <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse neon-text">
          Join the Neon Revolution!
        </h2>
        <p className="text-gray-300 text-xl mb-8 leading-relaxed">
          Create your account today and step into a world of vibrant, customizable neon lights. Express yourself with our unique designs or create your own!
        </p>
        <ul className="text-gray-300 text-lg list-none space-y-4 mb-8">
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Access exclusive member-only designs
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Save your favorite neon creations
          </li>
          <li className="flex items-center">
            <span className="text-purple-500 mr-2">✦</span>
            Receive special offers and discounts
          </li>
        </ul>
        <p className="text-gray-300 text-lg mt-6 font-semibold">
          Sign up now and let your creativity shine with our stunning neon lights!
        </p>
      </div>
    </div>
  );
}