import NextAuth from "next-auth";
import { authOptions } from "@/context/auth/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
