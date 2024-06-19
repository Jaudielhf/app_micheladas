import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat'; // Compat

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
const firebaseConfig = {
  apiKey: "AIzaSyAeFd4o37SO5dwDh1TQZVl2OQW513pD1YM",
  authDomain: "appcerverfriowagner44.firebaseapp.com",
  projectId: "appcerverfriowagner44",
  storageBucket: "appcerverfriowagner44.appspot.com",
  messagingSenderId: "886130637531",
  appId: "1:886130637531:web:cc8b8a93be393d21892afe",
  measurementId: "G-3GSFXJQGY0"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig) // Compat
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
