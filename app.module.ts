import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseConfig } from '../config/firebase.config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService } from '../services/storage.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(FirebaseConfig) // Inicializa o firebase conforme 
                                                    // firebase.config.ts
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    StorageService
  ]
})
export class AppModule {}
