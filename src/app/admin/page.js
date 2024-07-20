
"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../utils/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ImagePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"

const Page = () => {
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [mostRecentPhotos, setMostRecentPhotos] = useState([]);
  const [isDark , setIsDark] = useState(null);

   useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "true");
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosCollectionRef = collection(db, 'photos');
      const photosSnapshot = await getDocs(photosCollectionRef);
      const photosList = photosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataTable(photosList);
      setTotalPhotos(photosList.length);
      setMostRecentPhotos(photosList.slice(-3)); // Get the 3 most recent photos
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex-1 p-4 md:p-6">
      <iframe src="https://www.behance.net/embed/project/183676519?ilo0=1" className="w-full rounded-lg mb-3 no-scrollbar" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>
      <div className="flex flex-wrap gap-3">
        <Card className="bg-blue-100/30 md:w-3/12 w-full">
          <CardHeader>
            <CardTitle>Total Photos Posted</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center mt-6">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-2 text-[7rem]" />
            <span className="md:text-[6rem] text-3xl font-bold">{totalPhotos}</span>
          </CardContent>
        </Card>

        <Card className="bg-green-100/30 flex-1">
          <CardHeader>
            <CardTitle>Most Recent Photos</CardTitle>
          </CardHeader>
          <CardContent>
            {mostRecentPhotos.map(photo => (
              <Link key={photo.id} href={`/admin/photos/${photo.id}`}>
                <div className="flex items-center mb-2">
                  <img
                    src={photo.mainPhoto}
                    alt="Photo Thumbnail"
                    width={40}
                    height={40}
                    className="aspect-square rounded-md object-cover mr-2"
                  />
                  <div>
                    <h4 className="font-semibold">{photo.title}</h4>
                    <p className="text-sm text-muted-foreground">{photo.timestamp}</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-yellow-100/30 w-full">
          <CardHeader>
            <CardTitle>Add More Photos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <ImagePlus className="h-6 w-6 text-yellow-500 mr-2" />
            <Link href="/admin/upload">
              <Button>Upload</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    <div className="flex gap-3 w-full mt-2">
     <blockquote className="twitter-tweet w-full flex-1" data-theme={`${isDark ? "dark" : ""}`} ><p lang="in" dir="ltr">📍Dunga Beach, Kisumu. <a href="https://t.co/u6Ccn6WA6x">pic.twitter.com/u6Ccn6WA6x</a></p>&mdash; Hazel Bakhoya (@girrafesnaps) <a href="https://twitter.com/girrafesnaps/status/1586700155381850113?ref_src=twsrc%5Etfw">October 30, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
     <Calendar className=" border rounded-lg mt-2 h-max"/>
      </div>
     </main>
  );
};

export default Page;

