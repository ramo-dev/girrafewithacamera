
"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "@/components/ui/table";
import { db } from "../../utils/firebase.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FilePenIcon, TrashIcon, SquareArrowOutUpRight } from "lucide-react";
import { toast } from 'sonner';


const Page = () => {
  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosCollectionRef = collection(db, 'photos');
      const photosSnapshot = await getDocs(photosCollectionRef);
      const photosList = photosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataTable(photosList);
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    toast.promise(
      async () => {
        await deleteDoc(doc(db, "photos", id));
        setDataTable(prevData => prevData.filter(photo => photo.id !== id));
      },
      {
        loading: 'Deleting photo...',
        success: 'Photo deleted successfully!',
        error: 'Error deleting photo.'
      }
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="flex-1">
      <div className="min-h-screen flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm">
        {dataTable.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataTable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={item.mainPhoto}
                      alt="Photo Thumbnail"
                      width={64}
                      height={64}
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="truncate-text">{item.title}</TableCell>
                  <TableCell className="truncate-text">{item.description}</TableCell>
                  <TableCell className="truncate-text">{item.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/photos/${item.id}`}>
                        <Button variant="ghost">
                          <SquareArrowOutUpRight className="h-4 w-4" />
                          <span className="sr-only">Preview</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="hover:bg-red-200" 
                        onClick={() => handleDelete(item.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-400" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-14 flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">You have no photos</h3>
            <p className="text-sm text-muted-foreground">You can start seeing photos as soon as you upload them.</p>
            <Link href="/admin/upload">
              <Button className="mt-4">Add Photos</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;

