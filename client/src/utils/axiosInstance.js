// import axios from "axios";
// import { BASE_URL } from "./apiPaths";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: 80000,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common errors globally
//     if (error.response) {
//       if (error.response.status === 500) {
//         console.error("Server error. Please try again later");
//       }
//     } else if (error.code === "ECONNABORTED") {
//       console.error("Request timeout, Please try again");
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosInstance;

import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { toast } from "react-hot-toast"; // or your toast library (e.g., react-toastify)

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unexpected error occurred. Please try again.";

    // Server answered with an HTTP status code (400, 401, 404, 500)
    if (error.response) {
      errorMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        errorMessage;
    }
    // Request timed out (exceeded 80000ms)
    else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timed out. Please try again.";
    }
    // Server is down / Network offline (net::ERR_CONNECTION_REFUSED)
    else if (error.request) {
      errorMessage =
        "Unable to connect. Please check your connection or try again later.";
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default axiosInstance;
