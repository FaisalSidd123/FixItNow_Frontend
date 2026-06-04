import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "./firebase";
import { updateProfile } from "firebase/auth";
export const doCreateUserWithEmailAndPassword = async (
  name,
  email,
  password
) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(
    userCredential.user,
    {
      displayName: name,
    }
  );

  return userCredential;
};

export const doSignInWithEmailAndPassword = (
  email,
  password
) => {

  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const doSignInWithGoogle = async () => {

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(
    auth,
    provider
  );

  return result;
};

export const doSignOut = () => {

  return auth.signOut();
};

export const doPasswordReset = (email) => {

  return sendPasswordResetEmail(
    auth,
    email
  );

};


