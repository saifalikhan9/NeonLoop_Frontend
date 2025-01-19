import axios from "axios";
const BackendUrl = import.meta.env.VITE_Url;
const token = localStorage.getItem("accessToken");
export const signupfn = async (data) => {
  try {
    const res = await axios.post(`${BackendUrl}/users/register`, {
      ...data,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
export const signInfn = async (data) => {
  try {
    const res = await axios.post(`${BackendUrl}/users/login`, {
      ...data,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const cartfn = async (data) => {
  try {
    const res = await axios.post(`${BackendUrl}/cart/addToCart`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const cartDatafn = async () => {
  try {
    const res = await axios.get(`${BackendUrl}/cart/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};
export const deletefn = async (id) => {
  try {
    const res = await axios.delete(`${BackendUrl}/cart/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};

export const addressfn = async (data) => {
  try {
    const res = await axios.post(`${BackendUrl}/address/addAddress`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error) {
      throw error.response.data.data;
    }
  }
};
export const getAddress = async () => {
  try {
    const res = await axios.get(`${BackendUrl}/address/getAllAddress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error) {
      throw error;
    }
  }
};
export const deleteAddress = async (id) => {
  try {
    const res = await axios.delete(`${BackendUrl}/address/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const editAddress = async (id, data) => {
  try {
    const res = await axios.put(
      `${BackendUrl}/address/editAddress/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const fetchApiKey = async () => {
  try {
    const res = await axios.get(`${BackendUrl}/payment/apiKey`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching API key:", error);
  }
};

export const orderFetch = async () => {
  try {
    const res = await axios.get(`${BackendUrl}/payment/userOrder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const clearcart = async () => {
  
  try {
    const res = await axios.delete(`${BackendUrl}/cart/clear`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error|| "something went wrong"
  }
};
