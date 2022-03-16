import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export type User = {
  id: string;
  email: string;
};

const AuthService = {
  async signIn(email: string, password: string): Promise<User> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      id: user.uid,
      email: user.email!,
    };
  },
  async signUp(email: string, password: string): Promise<User> {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      id: user.uid,
      email: user.email!,
    };
  },
  signOut() {
    return auth.signOut();
  },
  resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  },
  confirmPassword(code: string, password: string) {
    return confirmPasswordReset(auth, code, password);
  },
};

export default AuthService;
