import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBzqNge_TSUgv2PcZO2wA8g_3b9qiE6Pu0",
  authDomain: "crwn-db-999ce.firebaseapp.com",
  databaseURL: "https://crwn-db-999ce.firebaseio.com",
  projectId: "crwn-db-999ce",
  storageBucket: "crwn-db-999ce.appspot.com",
  messagingSenderId: "476760129685",
  appId: "1:476760129685:web:fc2a38818716c0b5815b9c"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
