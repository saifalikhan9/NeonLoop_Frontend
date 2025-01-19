import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Separator } from "./components/ui/separator";
import "./app.css";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "./components/Context/ContextProvider";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <ContextProvider>
        <Header />
        <Separator />
        <Outlet />
        <Separator />
        <Footer />
      </ContextProvider>
    </div>
  );
};

export default Layout;
