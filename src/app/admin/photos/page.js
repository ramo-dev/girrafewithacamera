"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {FilePenIcon, TrashIcon } from "lucide-react"

const page = () => {
  return (
        <main className="flex-1 p-4 md:p-6">
                 <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <img
                      src="/placeholder.svg"
                      alt="Photo Thumbnail"
                      width={64}
                      height={64}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>Sunset Serenity</TableCell>
                  <TableCell>A breathtaking sunset over the ocean.</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />  
                      <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <img
                      src="/placeholder.svg"
                      alt="Photo Thumbnail"
                      width={64}
                      height={64}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>Mountain Majesty</TableCell>
                  <TableCell>Majestic peaks reaching for the sky.</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />  
                      <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <img
                      src="/placeholder.svg"
                      alt="Photo Thumbnail"
                      width={64}
                      height={64}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>Autumn Bliss</TableCell>
                  <TableCell>Vibrant colors of the changing seasons.</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                      <FilePenIcon className="h-4 w-4" />  
                      <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>  
        </main>
  )
};

export default page;

