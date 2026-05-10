import "./globals.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeQuest",
  description: "AI Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        {children}
      </body>
    </html>
  );
}