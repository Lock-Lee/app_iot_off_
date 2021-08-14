import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppService } from '../app.service';
const _window: any = window;
var microgear = _window.Microgear.create({
  key: 'xv4HY6mKMhDkP2a',
  secret: 'Dfgf23P2QIqPy7M4tGUVuf6a7',
  alias: 'Ionic' /*  optional  */,
});
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public tempShow = '0';
  public humiShow = '0';
  public phstart: any;
  public phend: any;

  public tempstart;
  public tempend;

  public readphstart;
  public readphend;
  public pump1;
  public pump2;
  public pump3;
  public pump4;

  thresholdConfig = {
    '0': { color: 'green' },
    '40': { color: 'orange' },
    '75.5': { color: 'red' },
  };

  constructor(public service: AppService, public fb: AngularFireDatabase) {
    this.service.message((val) => {
      if (val.topic == '/NUTTACIT/esp/th') {
        this.tempShow = `${val.message}`.split(',')[0];
        this.humiShow = `${val.message}`.split(',')[1];
      }
      if (val.topic == '/NUTTACIT/esp/th/pump') {
        console.log(val.message);
        this.pump1 = `${val.message}`.split(',')[0];
        this.pump2 = `${val.message}`.split(',')[1];
        this.pump3 = `${val.message}`.split(',')[2];
        this.pump4 = `${val.message}`.split(',')[3];
      }
    });
  }
  ngOnInit() {
    console.log(this.service.status);
  }
}
