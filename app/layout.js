import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Google Auth App",
  description: "Google login project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
