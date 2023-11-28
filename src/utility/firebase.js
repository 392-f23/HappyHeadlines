// COPIED FROM GYMBUDY
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB44V64IZFgafr0p6akQ3OWJxU6ptonecg",
  authDomain: "happyheadlines-9393c.firebaseapp.com",
  projectId: "happyheadlines-9393c",
  storageBucket: "happyheadlines-9393c.appspot.com",
  messagingSenderId: "616597320029",
  appId: "1:616597320029:web:a2d7bda36ec9202ebef8b4",
  measurementId: "G-V6K7HZSHTX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const pushNewsToDB = async (news) => {
  const baseUrl = "https://www.nytimes.com/";

  news.forEach(async (newsArr) => {
    newsArr.forEach(async (n) => {
      const {
        _id: id,
        headline,
        multimedia,
        section_name: sectionName,
        web_url: webUrl,
        lead_paragraph: leadParagraph,
      } = n;
      const target = multimedia.filter(
        (currImg) => currImg.subType === "xlarge"
      );
      const [targetImg] = target;
      const { url } = targetImg;

      if (!url) {
        return;
      }

      const newsObject = {
        id,
        image: baseUrl + url,
        title: headline.main,
        tags: sectionName,
        articleUrl: webUrl,
        summary: leadParagraph,
      };
      await addDoc(collection(db, "Stories"), newsObject);
    });
  });
};

const fetchNewsFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, "Stories"));
  const documents = [];
  querySnapshot.forEach((document) => {
    documents.push(Object.assign(document.data(), { documentId: document.id }));
  });
  return documents;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const firebaseSignOut = () => signOut(auth);
const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser), []);

  return [user];
};

const handleLogin = async (navigate) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Check if the user's email is associated with an existing account
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.length === 0) {
        // The email is not associated with an existing account
        // Prompt the user to sign up with Google
        signUpWithGoogle(navigate);
      } else {
        // The email is associated with an existing account
        // Redirect to home page or perform the sign-in logic as needed
        const { user } = result;
        signInWithGoogle(user, navigate);
        navigate("/home");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const checkIfLoggedIn = () => {
  const isSignedIn = localStorage.getItem("isSignedIn");
  return isSignedIn;
};

const handleLogOut = (navigate) => {
  signOut(auth);
  localStorage.removeItem("isSignedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("photoUrl");
  localStorage.removeItem("uid");
  navigate(0);
};

const checkIfSignedUp = async (uid) => {
  const authDocRef = doc(db, "users", uid);
  const snapshot = await getDoc(authDocRef);

  return snapshot.exists();
};

const signUpWithGoogle = async (navigate) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      const isSignedUp = await checkIfSignedUp(user.uid);

      if (isSignedUp) {
        signInWithGoogle(user, navigate);
      } else {
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          onboarded: false,
          likedPosts: [],
        };
        await setDoc(userDocRef, userData, { merge: true });
        signInWithGoogle(user, navigate);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const signInWithGoogle = async (user, navigate) => {
  const { displayName, photoURL, uid } = user;
  localStorage.setItem("isSignedIn", true);
  localStorage.setItem("name", displayName);
  localStorage.setItem("photoUrl", photoURL);
  localStorage.setItem("uid", uid);

  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  navigate(0);
};

const isOnboarded = async () => {
  const id = localStorage.getItem("uid");

  if (!id) {
    return false;
  }

  const userDocRef = doc(db, "users", id);
  const snapshot = await getDoc(userDocRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    const { onboarded } = data;

    if (onboarded === undefined) {
      return false;
    }

    return onboarded;
  } else {
    return false;
  }
};

const submitFormInformation = async (dbState) => {
  const uid = localStorage.getItem("uid");
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, dbState, { merge: true });
  await updateDoc(userDocRef, dbState);
};

// const submitStoryInformation = async (dbState) => {
//   const uid = localStorage.getItem("uid");
//   const userDocRef = doc(db, "users", uid);
//   await setDoc(userDocRef, dbState, { merge: true });
//   await updateDoc(userDocRef, dbState);
// };

const fetchUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = await snapshot.data();

    if (uid === localStorage.getItem("uid")) {
      localStorage.setItem("prevRequestLength", data.Requests.length);
    }

    return Object.assign(data, { uid: snapshot.id });
  }

  return null;
};

export const fetchAllData = async () => {
  const userCol = await getDocs(collection(db, "users"));
  var userData = {};
  userCol.forEach((doc) => {
    userData[doc.id] = doc.data();
  });

  return userData;
};

export const fetchPersonalData = async () => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }
  return null;
};

export const saveToFavorite = async (id, saved) => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    const { likedPosts } = data;

    if (saved) {
      const posts = likedPosts.filter((postId) => postId != id);
      const newData = Object.assign(data, { likedPosts: posts });
      await setDoc(userRef, newData);
    } else {
      likedPosts.push(id);
      const newData = Object.assign(data, { likedPosts: likedPosts });
      await setDoc(userRef, newData);
    }
  }
};

const fetchStory = async (id) => {
  const postRef = doc(db, "Stories", id);
  const snapshot = await getDoc(postRef);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  }
};

export {
  db,
  auth,
  provider,
  signInWithGoogle,
  firebaseSignOut as signOut,
  useAuthState,
  handleLogin,
  signUpWithGoogle,
  handleLogOut,
  checkIfLoggedIn,
  isOnboarded,
  submitFormInformation,
  fetchUserData,
  pushNewsToDB,
  fetchNewsFromDb,
  fetchStory,
};

export default submitFormInformation;
