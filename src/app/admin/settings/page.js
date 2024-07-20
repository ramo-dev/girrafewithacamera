
"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card';
import {account} from "../../utils/firebase.js"


const Page = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [socialMedia, setSocialMedia] = useState({
    twitter : String,
    linkedin : String,
    instagram : String
  });
  const [email, setEmail] = useState("");

  useEffect(()=>{
   const unsubscribe = account.onAuthStateChanged((user)=>{
        console.log(user?.email);
    }) 

    return () => unsubscribe();
  },[])



  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap gap-6"> 
        <Card className="flex-1 md:min-w-[400px]  bg-background">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>Update your profile photo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-4">
                <div className="w-40 h-40 rounded-full bg-gray-300/20 "></div>
                <Button variant="outline" className="md:w-5/12 w-7/12">Change Photo</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="flex-1 min-w-[300px] bg-background">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Change Password</Button>
            </CardFooter>
          </Card>
          
          <Card className="flex-1 min-w-[300px] bg-background">
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="twitter">Behance</Label>
                  <Input id="twitter" placeholder="https://behance.com/username" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" placeholder="https://instagram.com/username" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card className="flex-1 min-w-[300px] bg-background">
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Update your email address.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Update Email</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Page;
