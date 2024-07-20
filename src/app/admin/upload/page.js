

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { db, storage, account } from "../../utils/firebase.js";
import { addPhotos } from "./uploadPhoto.js";
import Image from "next/image";
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [mainPhoto, setMainPhoto] = useState(null);
  const [otherPhotos, setOtherPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setUid] = useState(null);

  useEffect(() => {
    const unsub = account.onAuthStateChanged(async (user) => {
      if (user) {
        await setUid(user.uid);
        console.log('User ID:', user.uid);
      } else {
        console.log('No user is signed in.');
      }
    });
    return () => unsub();
  }, []);

  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainPhoto(file);
    }
  };

  const handleOtherPhotosChange = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 0) {
      setOtherPhotos(filesArray);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = { id, db, storage, account, title,tag, description, location, mainPhoto, otherPhotos };
    console.log("Form submitted:", { id, title, description, tag, location, mainPhoto, otherPhotos });

    toast.loading('Uploading photo...', { id: 'upload' });
    try {
      await addToDatabase(form);
      toast.success('Photo uploaded successfully!', { id: 'upload' });
    } catch (err) {
      console.log(err);
      toast.error('Error uploading photo.', { id: 'upload' });
    }
  };

  async function addToDatabase(form) {
    try {
      setLoading(true);
      const resp = await addPhotos(form);
      console.log(resp);
      setLoading(false);
      setTitle("");
      setDescription("");
      setLocation("");
      setTag("")
      setMainPhoto(null);
      setOtherPhotos([]);
    } catch (err) {
      console.log(err);
      setLoading(false);
      throw err; 
    }
  }

  return (
    <form className="flex-1 p-4 md:px-6" onSubmit={handleFormSubmit}>
      <div className="mx-auto max-w-2xl">
        <Label htmlFor="card1" className="text-xl py-2">Main Photo</Label>
        {mainPhoto ? (
          <Card className="flex-1 w-full h-[65vh] mb-2 bg-background">
            <img
              alt="Main photo"
              className="object-cover w-full h-full rounded-md"
              src={URL.createObjectURL(mainPhoto)}
              layout="fill"
            />
          </Card>
        ) : (
          <Card className="flex-1 w-full h-40 mb-2 bg-background"></Card>
        )}
        <div className="grid gap-2">
          <Label htmlFor="mainPhoto">Upload Main Photo</Label>
          <Input required id="mainPhoto" type="file" onChange={handleMainPhotoChange}  accept=".jpg,.png"/>
        </div>

        <div className="my-4 border-t border-gray-300 pt-4">
          <Label htmlFor="card2" className="text-xl py-2">Other Photos</Label>
          <Card className="overflow-hidden bg-background p-5">
            <h2 className="text-muted-foreground text-sm my-4">Click the button below to upload photos</h2>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                {otherPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      alt={`Other photo ${index + 1}`}
                      className="object-cover w-full h-full rounded-md"
                      src={URL.createObjectURL(photo)}
                      layout="fill"
                    />
                  </div>
                ))}
                <label
                  htmlFor="otherPhotos"
                  className="flex aspect-square items-center justify-center rounded-md border border-dashed"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <input
                    id="otherPhotos"
                    type="file"
                    className="sr-only"
                    onChange={handleOtherPhotosChange}
                    multiple
                    accept=".jpg,.png"
                  />
                  <span className="sr-only">Upload</span>
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input required id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a title" />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="title">Tag</Label>
            <Input required id="tag" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Enter a Tag e.g Nature, Travel..." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              required
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin"/> : "Upload"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Page;


