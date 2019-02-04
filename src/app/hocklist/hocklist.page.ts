import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { Subscription } from 'rxjs';
import { HocklubService } from '../services/hocklub.service';
import { Hocklub } from '../models/hocklub.model';

@Component({
  selector: 'app-hocklist',
  templateUrl: 'hocklist.page.html',
  styleUrls: ['hocklist.page.scss']
})
export class HocklistPage implements OnInit {

  private backButton: Subscription;
  private lastTimeBackButtonClicked = 0;
  private exitToastOptions: ToastOptions = {
    message: 'Klik nogmaals om de app te verlaten.',
    duration: 2000,
    showCloseButton: true,
  };
  private hocklubs: Hocklub[];

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private hocklubService: HocklubService,
  ) {}

  ngOnInit() {
    this.hocklubService.getHocklubs().subscribe(hocklubs => this.hocklubs = hocklubs);
  }

  async ionViewDidEnter() {
    await this.platform.ready();

    // Handle platform back button for exiting app.
    this.backButton = this.platform.backButton.subscribeWithPriority(0, () => {
      if (new Date().getTime() - this.exitToastOptions.duration < this.lastTimeBackButtonClicked) {
        navigator['app'].exitApp();
      } else {
        this.showExitToast();
        this.lastTimeBackButtonClicked = new Date().getTime();
      }
    });
  }

  ionViewWillLeave() {
    this.backButton.unsubscribe();
  }

  private async showExitToast() {
    const toast = await this.toastController.create(this.exitToastOptions);
    toast.present();
  }
}
