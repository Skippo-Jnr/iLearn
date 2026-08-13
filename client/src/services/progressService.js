import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const getDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(API_PATHS.PROGRESS.GET_DASHBOARD);
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to fetch dashboard data",
      }
    );
  }
};

const progressService = {
  getDashboardData,
};

export default progressService;
