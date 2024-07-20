"use client";
import React,  {useEffect, useState, useContext} from "react"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {account} from "./utils/firebase.js"
import {toast} from "sonner";
import { Loader2 } from 'lucide-react';
import {UserContext} from "./admin/context/UserContext.js"


const page = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
  const router = useRouter();


  function handleSubmit(e){
    e.preventDefault();
    if(email.trim() === "" || email.trim() === ""){
      toast.error("Please fill in the required fields");
      return
    } handleSignin();
  }

  useEffect(()=>{
  
   async function getUser(){
      const resp = account;
      console.log(resp)
   }
    getUser()
  },[])


  async function handleSignin(){
    try{
      setIsLoading(true);
      const acc = await signInWithEmailAndPassword(account, email, password)
      const resp = acc;
      if(resp){
        setIsLoading(false);
      }
      toast.success("Login was successful");
      setUserLoggedIn(true);
      localStorage.setItem("UUID", !!resp);
      setTimeout(() => {
        toast.loading("redirecting....")
          setTimeout(() => {
              toast.dismiss()
             router.push("/admin") 
            }, 2500);  
      }, 1000);
      }catch(err){
      console.log(err)
      toast.error("Email or password is incorrect");
      setIsLoading(false);
    }
  }


  return (
    <div className="w-full lg:grid lg:h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="hidden bg-muted lg:block h-screen">
        <Image
          src="https://images.unsplash.com/photo-1507461476191-0ed4f9f18533?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          width="1920"
          height="600"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center pb-14 md:px-0 px-6 h-screen">
        <form className="mx-auto grid w-;350px] gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="border border-gray-300"
                placeholder="m@example.com"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password"
                placeholder="*******"
                required 
                onChange={(e)=>setPassword(e.target.value)}
                className="border border-gray-300"/>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin"/> : "Login"}
            </Button>
            </div>
          
        </form>
      </div>
         </div>
  )
}


export default page;
