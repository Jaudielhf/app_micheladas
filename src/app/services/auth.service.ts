import { Injectable } from '@angular/core';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'; // Importa signInWithPopup
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  async signup(email: string, password: string, name: string, lastName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'Usuarios', user.uid), {
        Id: user.uid,
        Correo_E: user.email,
        Nombre: name,
        Apellidos: lastName,
        Rol: "usuario",
        Telefono: ""
      });
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async getUserData(uid: string): Promise<UserData | null> {
    const userDoc = await getDoc(doc(db, 'Usuarios', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      console.error('No such document!');
      return null;
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider); // Usa signInWithPopup correctamente
      const user = userCredential.user;
      if (user) {
        const userDoc = await this.getUserData(user.uid);
        if (!userDoc) {
          await setDoc(doc(db, 'Usuarios', user.uid), {
            Id: user.uid,
            Correo_E: user.email,
            Nombre: user.displayName || '',
            Rol: "usuario",
            Telefono: user.phoneNumber || ""
          });
        }
      }
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  }

  async loginWithFacebook() {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user) {
        const userDoc = await this.getUserData(user.uid);
        if (!userDoc) {
          await setDoc(doc(db, 'Usuarios', user.uid), {
            Id: user.uid,
            Correo_E: user.email,
            Nombre: user.displayName || '',
            Rol: "usuario",
            Telefono: user.phoneNumber || ""
          });
        }
      }
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
      throw error;
    }
  }
}
