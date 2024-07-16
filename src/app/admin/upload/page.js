"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {Card} from "@/components/ui/card"

const page = () => {
  return (
        <div className="flex-1 p-4 md:px-6">
          <div className="mx-auto max-w-2xl">
        <Label htmlFor="card1">Main Photo</Label>
          <Card className="flex-1 w-full h-40 mb-2">
            
          </Card>
        <Label htmlFor="card2">Other Photos</Label>
          <Card className="flex-1 w-full h-40 mb-3">
          </Card>
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
        </div>
  )
}

export default page;
