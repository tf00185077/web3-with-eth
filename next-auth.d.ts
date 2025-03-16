import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * 擴展 Session 類型
   */
  interface Session {
    user: {
      id: string;
      // 添加其他你需要的字段，例如：
      role?: string;
      // ...
    } & DefaultSession["user"];
  }

  /**
   * 擴展 User 類型
   */
  interface User {
    id: string;
    // 添加其他你需要的字段，例如：
    role?: string;
    // ...
  }
}

/**
 * 擴展 JWT 類型
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    // 添加其他你需要的字段，例如：
    role?: string;
    // ...
  }
}
