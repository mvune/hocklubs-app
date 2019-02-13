import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { timer } from 'rxjs';

import { ToastOptions } from '@ionic/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  private lastTimeBackButtonClicked = 0;
  private exitToastOptions: ToastOptions = {
    message: 'Klik nogmaals om de app te verlaten.',
    duration: 1800,
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private headerColor: HeaderColor,
    private toastController: ToastController,
    private location: Location,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      timer(1000).subscribe(() => this.splashScreen.hide());
      this.headerColor.tint('#6f9634');
      this.registerBackButtonAction();
    });
  }

  private registerBackButtonAction() {
    // Tapping back button on home page should exit app (after a toast is shown).
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.location.isCurrentPathEqualTo('/tabs/hocklist')) {
        if (new Date().getTime() - this.exitToastOptions.duration < this.lastTimeBackButtonClicked) {
          navigator['app'].exitApp();
        } else {
          this.showExitToast();
          this.lastTimeBackButtonClicked = new Date().getTime();
        }
        return;
      }
      history.back();
    });
  }

  private async showExitToast() {
    const toast = await this.toastController.create(this.exitToastOptions);
    toast.present();
  }
}
