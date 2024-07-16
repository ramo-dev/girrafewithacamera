


"use client";


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Image, Upload, Check, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }) {
  const [selectedLink, setSelectedLink] = useState("/admin/photos");
  const [isDark, setIsDark] = useState(false); // Initialize isDark to false

  const router = useRouter();

  const handleLinkClick = (path) => {
    setSelectedLink(path);
    router.push(path);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }

    
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleThemeChange = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`flex min-h-screen w-full ${isDark ? "dark" : ""}`}>
      <aside className="border-r hidden md:block w-[40vh] sticky top-0 h-screen bg-background">
        <div className="flex h-full max-h-screen flex-col gap-4 p-4">
          <Link href="#" className="ps-3 flex items-center gap-2 font-semibold text-foreground" prefetch={false}>
            <Camera className="h-6 w-6" />
            <span>Giraffe</span>
          </Link>
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => handleLinkClick("/admin/photos")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedLink === "/admin/photos"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Image className="h-5 w-5" />
              Photos
            </button>
            <button
              onClick={() => handleLinkClick("/admin/upload")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedLink === "/admin/upload"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Upload className="h-5 w-5" />
              Upload
            </button>
            <button
              onClick={() => handleLinkClick("/admin/ai")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedLink === "/admin/ai"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Check className="h-5 w-5" />
              Giraffe AI
            </button>
            <button
              onClick={() => handleLinkClick("/admin/settings")}
              className={`w-full flex items-center gap-2 rounded-md px-3 py-2 ${
                selectedLink === "/admin/settings"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:h-16 md:px-6 text-foreground">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-semibold md:text-xl">Welcome back Hazel!</h1>
          <Button onClick={handleThemeChange} className="ms-auto">
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-background text-foreground">{children}</main>
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

