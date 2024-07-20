"use client";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext.js";
import { useRouter } from "next/navigation";
import { Camera, Image, Upload, Bot, Settings, Menu, Sun, Moon, X, LogOut, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { account } from "../utils/firebase.js";
import { signOut } from "firebase/auth";

export default function Layout({ children }) {
  const router = useRouter();
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [isDark, setIsDark] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState("");
  const [selectedTab, setSelectedTab] = useState(router.pathname); // Use router.pathname for initial selected tab

  useEffect(() => {
    // Check authentication status on component mount and when router pathname changes
    checkAuthentication();
    console.log(router.pathname)
  }, [router.pathname]);

  useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "true");
  }, []);

  const checkAuthentication = () => {
    console.log(router.pathname)
    const auth = localStorage.getItem("UUID");
    if (!auth) {
      // If authentication is not available, redirect to login
      router.replace("/");
    }
  };

  const handleTabClick = (path) => {
    setSelectedTab(path);
    router.push(path);
    setIsSidebarOpen(false); // Close the sidebar after selecting a tab
  };

  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = async () => {
    try {
      await signOut(account);
      localStorage.removeItem("UUID");
      router.replace("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!userLoggedIn) {
    return null; // Or return a loading indicator while userLoggedIn state is being determined
  }

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      {/* Sidebar component */}
      <aside className={`border-r ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-[40vh] fixed md:sticky top-0 h-screen bg-background z-40 transition-transform duration-300 ease-in-out`}>
        {/* Sidebar content */}
        <div className="flex h-full max-h-screen flex-col gap-4 p-4">
          <div className="bg-gray-300/20 md:p-3 p-2 rounded-lg ps-3 flex items-center gap-2 font-semibold text-foreground">
            <Camera className="h-6 w-6" />
            <span>Giraffe</span>
            <Button variant="text" size="icon" className="md:hidden ms-auto" onClick={toggleSidebar}>
              <X className="h-6 w-6 " />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          {/* Sidebar navigation */}
          <nav className="flex-1 space-y-2">
            {/* Example tab buttons */}
            <button
              onClick={() => handleTabClick("/admin")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedTab === "/admin"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <House className="h-5 w-5" />
              Home
            </button>
            <button
              onClick={() => handleTabClick("/admin/photos")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedTab === "/admin/photos"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Image className="h-5 w-5" />
              Photos
            </button>
            <button
              onClick={() => handleTabClick("/admin/upload")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedTab === "/admin/upload"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Upload className="h-5 w-5" />
              Upload
            </button>
            <button
              onClick={() => handleTabClick("/admin/ai")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedTab === "/admin/ai"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Bot className="h-5 w-5" />
              Giraffe AI
            </button>
            <button
              onClick={() => handleTabClick("/admin/settings")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedTab === "/admin/settings"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
            <button
              onClick={() => handleLogOut()}
              className={`hover:bg-muted/60 w-full flex items-center gap-2 rounded-md px-3 py-2 focus:bg-primary focus:text-primary-foreground text-muted-foreground hover:bg-primary/90"}`}
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background ps-4 md:h-16 md:ps-6 text-foreground">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-semibold md:text-xl">Welcome, Hazel!</h1>
          {/* Theme toggle */}
          <label className="rounded-full border-2 border-black scale-50 inline-flex items-center relative ms-auto cursor-pointer">
            <input
              type="checkbox"
              checked={isDark}
              onChange={handleThemeChange}
              className="peer hidden"
            />
            <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
            <Sun className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]" />
            <Moon className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]" />
          </label>
        </header>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-background text-foreground">{children}</main>
        {/* Footer */}
        <footer className="py-4 border-t bg-background text-foreground">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-500/25 h-10 w-10 rounded-full me-3"></div>
              <span className="text-lg font-semibold">Giraffe with a Camera</span>
            </div>
            <div>&copy; {new Date().getFullYear()}</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

