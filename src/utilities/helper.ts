import CryptoJS from "crypto-js";

class HelperClass {
  encodeMd5(md5: string): string {
    try {
      return CryptoJS.MD5(md5).toString();
    } catch (error: any) {
      throw new Error(`MD5 Encoding Failed: ${error.message}`);
    }
  }

  generateRandomChar(): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  }

  obfuscateToken(token: string): string {
    // Kiểm tra nếu token có độ dài < 3, trả về token không thay đổi
    if (token.length < 3) return token;

    // Tạo một ký tự ngẫu nhiên từ a-z, A-Z, 0-9
    const randomChar = this.generateRandomChar();

    // Chèn ký tự ngẫu nhiên vào vị trí thứ 3
    return token.slice(0, 3) + randomChar + token.slice(3);
  }

  deobfuscateToken(obfuscated: string): string {
    if (obfuscated.length < 4) {
      throw new Error("Invalid token format: Token is too short to deobfuscate");
    }
    // Cắt bỏ ký tự ở vị trí thứ 3 và trả lại phần còn lại
    return obfuscated.slice(0, 3) + obfuscated.slice(4);
  }

}

export default new HelperClass();
