import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" }
      },
      authorize: async (credentials, req) => {
        const res = await fetch("http://localhost:3001/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }

        // Caso contrário, lance um erro
        throw new Error(user?.message ?? "Falha ao autenticar usuário");
      }
    })
  ],
  pages: {
    signIn: "/",
    error: "/"
  },
  callbacks: {
    async jwt ({token, user}) {
      return {...token, ...user};
    },
    async session({session, token, user}) {
      session.user = {
        id: token.user.id,
        name: token.user.name,
        token: token.token
      };
      return session;
    }
  },
};

export default NextAuth(authOption);
