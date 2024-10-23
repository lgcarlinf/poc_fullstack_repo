import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

export interface AuthService {
  loginWithGoogle: () => Promise<FirebaseUser>;
  logout: () => Promise<void>;
  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => void;
}

export class FirebaseAuthService implements AuthService {
  async loginWithGoogle(): Promise<FirebaseUser> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void): void {
    onAuthStateChanged(auth, callback);
  }
}
