


// uploadPhoto.js
import moment from "moment"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc,serverTimestamp } from "firebase/firestore";

export const addPhotos = async ({ id, db, storage, account, title, tag, description, location, mainPhoto, otherPhotos }) => {
  try {
    const uid = id;
    console.log(uid)
    const timer = serverTimestamp();
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log(timestamp, timer)
    
    // Upload main photo
    const mainPhotoRef = ref(storage, `photos/${timestamp}/main/${mainPhoto.name}`);
    const mainPhotoSnapshot = await uploadBytes(mainPhotoRef, mainPhoto);
    const mainPhotoURL = await getDownloadURL(mainPhotoSnapshot.ref);
    
    // Upload other photos
    const otherPhotoURLs = [];
    for (const photo of otherPhotos) {
      const photoRef = ref(storage, `photos/${timestamp}/others/${photo.name}`);
      const photoSnapshot = await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoSnapshot.ref);
      otherPhotoURLs.push(photoURL);
    }

    // Add document to Firestore
    const photosCollectionRef = collection(db, 'photos');
    const docRef = await addDoc(photosCollectionRef, {
      uid: uid,
      title: title,
      tag:tag,
      description: description,
      location: location,
      mainPhoto: mainPhotoURL,
      otherPhotos: otherPhotoURLs,
      timestamp: timestamp
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
    return err;
  }
};

