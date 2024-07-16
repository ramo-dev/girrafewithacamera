"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const page = () => {
  return (
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-2xl">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter a description" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo</Label>
                <Input id="photo" type="file" />
              </div>
              <Button type="submit" className="w-full">
                Upload
              </Button>
            </form>
          </div>
        </main>
  )
}

export default page;


