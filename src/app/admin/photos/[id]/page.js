
"use client"
// /photos/[id]/page.js
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin } from "lucide-react";
import { db } from '../../../utils/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const Page = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const pathname = usePathname();
  console.log(pathname);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (id) {
        const docRef = doc(db, 'photos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPhoto(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchPhoto();
  }, [id]);

  if (!photo) return <div className="w-full mx-auto p-4 bg-background rounded-lg border"><h2 className="text-2xl">Loading...</h2></div>;

  return (
    <div className=" p-4 bg-background rounded-lg border w-full max-w-[350px] md:max-w-full">
      <img
        src={photo.mainPhoto}
        alt={photo.title}
        className="w-full h-auto mb-2 rounded-lg"
      />
      <small className="text-muted-foreground w-full border-b">{photo.timestamp}</small>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold truncate">{photo.title}</h1>
        <div className="flex items-center space-x-2">
          <MapPin className="text-red-500" />
          <p className="text-gray-700 dark:text-foreground text-sm truncate">{photo.location}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-800 dark:text-foreground line-clamp-3">{photo.description}</p>

      {photo.otherPhotos && photo.otherPhotos.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Other Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photo.otherPhotos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Other photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No extra photos</p>
      )}
    </div>
  );
};

export default Page;

