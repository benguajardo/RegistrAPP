import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false }) video!: ElementRef;

  videoElement: any;

  constructor( private toastController: ToastController ) { }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
  }

  ngOnInit() {
  }

  async startScan() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
  }

  stopScan() {
    this.scanActive = false;
  }

  reset() {
    this.scanResult = null;
  }

  async showQrToast() {
    const toast = await this.toastController.create({
      message : `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }

}
