import NextAuth from "next-auth";
import { authOptions } from "@/consts/auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
