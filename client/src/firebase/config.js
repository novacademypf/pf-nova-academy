import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjU7M8On8R36b1OMJSG5YHKThdXfYM5b0",
  authDomain: "image-novacademy.firebaseapp.com",
  projectId: "image-novacademy",
  storageBucket: "image-novacademy.appspot.com",
  messagingSenderId: "952597079328",
  appId: "1:952597079328:web:003fe601ff02b09b4a6345",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
