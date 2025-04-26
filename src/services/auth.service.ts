import axios from "axios";
import { ACCESS_TOKEN_EXP, ACCESS_TOKEN_KEY, environment } from "../environments/environment";
import { UserLogin } from "../models/user";
import helper from "../utilities/helper";
import { Token } from "../models/auth";

class AuthService {
    isExpired(): boolean {
      const expiresAt = localStorage.getItem(ACCESS_TOKEN_EXP);
  
      // Nếu không có expiresAt, token hết hạn (return true)
      if (!expiresAt) {
        return true;
      }
  
      // Chuyển expiresAt về dạng số
      const expirationTime = Number(expiresAt);
  
      // Lấy thời gian hiện tại
      const currentTime = Math.floor(Date.now() / 1000); // Time in seconds
  
      // Kiểm tra xem token đã hết hạn chưa
      return expirationTime < currentTime;
    }
  
    
  
    setToken(token: Pick<Token, 'accessToken'>) {
      const rawToken = token.accessToken?.token || '';
      const obfuscated = helper.obfuscateToken(rawToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, obfuscated);
      localStorage.setItem(ACCESS_TOKEN_EXP, token.accessToken?.expiresAt?.toString() || '');
    }
  
    getToken(): string | null {
      const obfuscated = localStorage.getItem(ACCESS_TOKEN_KEY);
      return obfuscated ? helper.deobfuscateToken(obfuscated) : null;
    }
  
    async startLogin(user: any): Promise<boolean> {
      try {
        const url = environment.api + "/auth/login";
        // const encryptedPassword = helper.encodeMd5(user.password);
        const data: UserLogin = {
          email: user.email,
          password: user.password,
        };
        const response = await axios.post(url, {
          ...data
        },
        {
          withCredentials: true
        }
      );
  
        if (!response.data.data) {
          throw new Error(response.data.message);
        }
  
        const accessToken = response.data.data;
        if (!accessToken) return false;
        this.setToken({ accessToken });
  
        return true;
      } catch (error: any) {
        throw error?.response?.data;
      }
    }
  }
  
  export default new AuthService();