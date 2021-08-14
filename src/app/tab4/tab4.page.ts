import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public phstart;
  public phend;

  public tempstart;
  public tempend;

  public timestart1;
  public timeend1;

  public timestart2;
  public timeend2;

  public timephstart1;
  public timephend1;

  public timephstart2;
  public timephend2;

  public timeautostart;
  public timeautoend;
  constructor(public service: AppService, public fb: AngularFireDatabase) {
    this.service.message((val) => {
      if (val.topic == '/NUTTACIT/esp/write_data') {
        this.timeautostart = `${val.message}`.split(',')[0];
        this.timeautoend = `${val.message}`.split(',')[1];
        this.timestart1 = `${val.message}`.split(',')[2];
        this.timeend1 = `${val.message}`.split(',')[3];
        this.timestart2 = `${val.message}`.split(',')[4];
        this.timeend2 = `${val.message}`.split(',')[5];
        this.timephstart1 = `${val.message}`.split(',')[6];
        this.timephstart2 = `${val.message}`.split(',')[7];
        this.timephend2 = `${val.message}`.split(',')[8];
        this.phstart = `${val.message}`.split(',')[9];
        this.phend = `${val.message}`.split(',')[10];
        this.tempstart = `${val.message}`.split(',')[11];
        this.tempend = `${val.message}`.split(',')[12];
      }
    });
  }
  ngOnInit() {}
  onRead() {
    this.service.publish(`/read_data`, '1');
  }
}
