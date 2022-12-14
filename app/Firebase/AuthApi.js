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
const createUser = async (formData) => {
  const { name, password, email, imgurl, token } = formData;
  const image_url = await imgurl[0].uri;
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const profilePic = await storeImage(image_url);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: profilePic,
      phoneNumber: token,
    });
    const user = userCredential.user;
    const formData = {
      name: name,
      email: email,
      imgurl: profilePic,
      notifToken: token,
      userRef: user.uid,
    };
    formData.timestamp = serverTimestamp();
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
export default {
  loginUser,
  createUser,
};
