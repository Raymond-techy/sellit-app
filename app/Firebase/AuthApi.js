import {
  updateProfile,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import uuid from "react-native-uuid";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
const createUser = async (name, email, password, image_url) => {
  try {
    console.log(image_url, "profile pic");
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const profilePic = await storeImage(image_url);
    console.log(profilePic, "profile pic uploaded");
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profilePic,
    });
    const user = userCredential.user;
    const formData = {
      name: name,
      email: email,
      imgurl: profilePic,
      userRef: user.uid,
    };
    formData.timestamp = serverTimestamp();
    console.log(user.uid, "user identity logged");
    await setDoc(doc(db, "users", user.uid), formData);
    return user;
  } catch (error) {
    throw error.code;
  }
};

const loginUser = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw Error(error);
  }
};
const storeImage = async (image_url) => {
  const auth = getAuth();
  return new Promise(async (resolve, reject) => {
    const fileName = `${auth.currentUser.uid}-${uuid.v4()}`;
    const storageRef = ref(getStorage(), "images/" + fileName);
    // const storageRef = ref(getStorage(), "image_name");

    const img = await fetch(image_url);
    const blob = await img.blob();

    console.log("uploading image");
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        this.setState({ isLoading: false });
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
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
export default {
  loginUser,
  createUser,
};
