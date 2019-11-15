import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsManagerProvider } from '../../providers/events-manager/events-manager';
import { ConsumeApiProvider } from '../../providers/consume-api/consume-api';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   barcodeData: string;
   cancel: boolean;
  tournamentList: any[];
  constructor(public navCtrl: NavController,
              public eventsManager: EventsManagerProvider,
              public consumeApi: ConsumeApiProvider,
              private barcodeScanner: BarcodeScanner) {
  }
  scan(){
    this.barcodeScanner.scan(
      { prompt: 'Coloque el código a leer en el área permitida' }
    ).then(barcodeData => {
      // this.eventsManager
      // .setGeneralNotificationMessage("Data qr:: "+ barcodeData.text);
      this.barcodeData = barcodeData.text;
      this.cancel = barcodeData.cancelled;
       if(this.cancel){
         this.showLoading();
         //this.eventsManager
         //.setGeneralNotificationMessage("cancel:: ");
       }

     }).catch(err => {
         console.log('Error', err);
         this.eventsManager
      .setGeneralNotificationMessage("Data qr error:: "+ err);
     });
  }

  showAlert() {
    this.eventsManager
        .setGeneralNotificationMessage("Important rx notification");
  }

  showLoading() {
    this.eventsManager
        .setIsLoadingEvent(true);
    //timeout simula una operacion que espera un tiempo
    setTimeout(() => {
      this.eventsManager
          .setIsLoadingEvent(false);
    }, 3000);
  }

  getInfoApi() {
    this.eventsManager
        .setIsLoadingEvent(true);
    this.consumeApi
        .getTournaments()
        .subscribe(result => {
          this.tournamentList = result;
          this.eventsManager
              .setIsLoadingEvent(false);
        });
  }
}

