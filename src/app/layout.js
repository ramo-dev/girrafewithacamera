
"use client";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import React, { useState , useEffect} from "react";
import { UserContext } from "./admin/context/UserContext.js";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(null);

  useEffect(()=>{
    const user = localStorage.getItem("UUID");
    setUserLoggedIn(user);

  },[])

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
          {children}
          <Toaster position="top-right" />
        </UserContext.Provider>
      </body>
    </html>
  );
}

