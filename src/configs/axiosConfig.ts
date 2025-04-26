import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_EXP, ACCESS_TOKEN_KEY, environment } from "../environments/environment";
import authService from "../services/auth.service";


// URL cơ bản của API
const BASE_URL = environment.api;


// Hàm kiểm tra token có hết hạn hay không
const isTokenExpired = () => {
  const exp = localStorage.getItem(ACCESS_TOKEN_EXP);
  if (!exp) return true; // Không có token => xem như hết hạn
  return Number(exp) < Math.floor(Date.now() / 1000) + 60; // Sắp hết hạn trong 60 giây
};

// let refreshTokenPromise: Promise<string | null> | null = null;

// const refreshAuthToken = async (): Promise<string | null> => {
//   if (!refreshTokenPromise) {
//     refreshTokenPromise = (async () => {
//       try {
//         const response: Token | null = await authService.refreshToken();
//         if (!response || !response.accessToken) {
//           throw new Error("Failed to refresh token");
//         }

//         return response.accessToken.token;
//       } catch (error) {
//         console.error("Refresh token failed:", error);
//         localStorage.removeItem(ACCESS_TOKEN_KEY);
//         localStorage.removeItem(REFRESH_TOKEN_KEY);
//         localStorage.removeItem(REFRESH_TOKEN_EXP);
//         localStorage.removeItem(ACCESS_TOKEN_EXP);
//         return null;
//       } finally {
//         refreshTokenPromise = null;
//       }
//     })();
//   }

//   return refreshTokenPromise;
// };


// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig ) => {
    // Thêm Authorization token nếu có
    let token = authService.getToken();
    
    if (isTokenExpired()) {
      // token = await refreshAuthToken(); // Gọi API refresh token
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Xử lý lỗi trong yêu cầu
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý phản hồi thành công
    return response; // Trả về data để client không cần gọi `response.data` nhiều lần
  },
  (error: AxiosError) => {
    // Xử lý lỗi trong phản hồi
    console.error("[Response Error]", error.response);
    
    
    if (error.response?.status === 401) {
      // Ví dụ: Tự động logout
      console.warn("Unauthorized! Redirecting to login...");
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(ACCESS_TOKEN_EXP);

      // window.location.reload()
    }

    throw error.response?.data;
  }
);

export default axiosInstance;
