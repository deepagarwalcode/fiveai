// "use client";

import { Inter } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
// import extension from "@theatre/r3f/dist/extension";
// import studio from "@theatre/studio";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "5ive.ai",
  description: "Welcome to Five.ai, a sub-brand of Zapnosys. Unlock your potential with our AI-driven, personalized learning platform. Explore courses, grow, and transform your education journey. Start now with your exclusive login details.",
};

// studio.extend(extension);
// studio.initialize();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,
          maximum-scale=1,
          minimum-scale=1,
          user-scalable=no"
        />
      </head>
      <body className={inter.className} >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
