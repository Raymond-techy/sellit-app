import uuid from "react-native-uuid";

import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import Cache from "../utility/Cache";

const auth = getAuth();
const fetchListings = async () => {
  try {
    const listingRef = collection(db, "listings");
    const queries = query(listingRef, orderBy("timestamp", "desc"));
    const querySnap = await getDocs(queries);
    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    const key = "listings";
    if (listings.length >= 1) {
      Cache.store(key, listings);
      return listings;
    }
    const data = await Cache.get(key);
    return data ? data : listings;
  } catch (error) {
    throw Error(error, "error occured");
  }
};
const fetchMyListings = async (refIden = auth.currentUser.uid) => {
  try {
    const listingRef = collection(db, "listings");
    const queries = query(
      listingRef,
      where("sellerRef", "==", refIden),
      orderBy("timestamp", "desc")
    );
    const querySnap = await getDocs(queries);
    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    const key = "mylistings";
    if (listings.length >= 1) {
      Cache.store(key, listings);
      return listings;
    }
    const data = await Cache.get(key);
    return data ? data : listings;
  } catch (error) {
    throw Error(error);
  }
};
const getUser = async (sellerRef) => {
  try {
    const userRef = doc(db, "users", sellerRef);
    const docSnap = await getDoc(userRef);
    const user = docSnap.data();
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const storeImage = async (image_url) => {
  return new Promise(async (resolve, reject) => {
    const fileName = `${auth}-${uuid.v4()}-${image_url}`;
    const storageRef = ref(getStorage(), "images/" + fileName);
    // const storageRef = ref(getStorage(), "image_name");

    const img = await fetch(image_url);
    const blob = await img.blob();

    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        this.setState({ isLoading: false });
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

const postListings = async (listings) => {
  const userRef = auth.currentUser.uid;
  try {
    const { imgurl } = listings;
    const images = await Promise.all(
      [...imgurl].map((image) => storeImage(image.uri))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formData = {
      ...listings,
      images,
      timestamp: serverTimestamp(),
      sellerRef: userRef,
    };
    delete formData.imgurl;
    const docRef = await addDoc(collection(db, "listings"), formData);
  } catch (error) {
    throw Error(error);
  }
};
const postWish = async (wish) => {
  const userRef = auth.currentUser.uid;
  try {
    const formData = {
      ...wish,
      timestamp: serverTimestamp(),
      wishRef: userRef,
    };
    const docRef = await addDoc(collection(db, "wishlists"), formData);
  } catch (error) {
    throw Error(error);
  }
};
export default {
  fetchListings,
  fetchMyListings,
  getUser,
  postListings,
  postWish,
};
