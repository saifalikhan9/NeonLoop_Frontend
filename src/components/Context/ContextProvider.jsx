import { useState, useEffect } from "react";
import UserContext from "./ContextApi";
import axios from "axios";
import { deletefn } from "@/lib/api";

const BackendUrl = "http://localhost:8000/api/v1";

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const tokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const res = await axios.post(
        `${BackendUrl}/users/refresh-token`,
        { refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // Update tokens in local storage
      localStorage.setItem("accessToken", res.data?.data.accessToken);
      localStorage.setItem("refreshToken", res.data?.data.refreshToken);
    } catch (error) {
      // Consider logout or redirect logic here if refresh fails
    }
  };
  useEffect(() => {
    const timer = setInterval(tokenRefresh, 60 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

console.log(user);


  const [selectedAddress, setSelectedAddress] = useState([]);

  const value = { selectedAddress, setSelectedAddress, user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
