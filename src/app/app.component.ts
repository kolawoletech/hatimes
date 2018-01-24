import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  loader: any;

  constructor(public splashScreen: SplashScreen, public platform: Platform, public loadingCtrl: LoadingController, public storage: Storage) {



    this.presentLoading();

    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.storage.get('introShown').then((result) => {

        if(result){
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'IntroPage';
          this.storage.set('introShown', true);
        }

        this.loader.dismiss();

      });
      this.loader.dismiss();
      window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("7d552e03-5762-4190-89ca-fa4a682cafbb", "276896804119")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();





    });

  }

  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });

    this.loader.present();


  }



}

