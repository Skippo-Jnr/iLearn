import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  async function getAuthState() {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.AUTH.AUTHENTICATE_USER,
      );

      if (data.success) {
        setIsAuthenticated(true);
        getUserData();
      }
    } catch (error) {
      console.error("Auth check failed: ", error?.response?.data?.error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  async function getUserData(params) {
    try {
      const { data } = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);

      if (data.success) {
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  }

  async function updateUser(updatedUserData) {
    try {
      const { data } = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        updatedUserData,
      );

      if (data.success) {
        setUser(data.userData);
        toast.success("Profile updated successfully");
        return true;
      }
    } catch (error) {
      console.error(error?.response?.data?.error || "failed to update profile");
      toast.error("failed to update profile");
      return false;
    }
  }

  async function logout() {
    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);

      if (data.success) {
        setUser(null);
        setIsAuthenticated(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong");
      // console.error(error.response?.data?.error);
    }
  }

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    getAuthState,
    updateUser,
    setUser,
    setIsAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
