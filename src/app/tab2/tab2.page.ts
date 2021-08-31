import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public TimeStartAuto;
  public TimeEndAuto;
  public phstart;
  public phend;
  public Moisturestart = 0;
  public Moisturepend = 0;
  public SW_auto;
  public SW_timeauto: boolean = false;
  constructor(public service: AppService, public fb: AngularFireDatabase) {
    this.service.message((val) => {
      // if (val.topic == "/NUTTACIT/esp/th/read_time1") {
      //   this.readtimestart1 = `${val.message}`.split(",")[0];
      //   this.readtimeend1 = `${val.message}`.split(",")[1];
      // }
    });
  }
  public auto_on() {
    this.fb
      .object('set/swauto')
      .set(this.SW_auto)
      .then(() => {
        this.service.publish(`/swauto`, `${this.SW_auto}`);
      });

    console.log(this.SW_auto);
  }
  ngOnInit() {
    this.fb
      .object('set/swauto')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.SW_auto = value;
      });
    this.fb
      .object('/set/timeauto/sw1')
      .valueChanges()
      .subscribe((value: any) => {
        this.TimeStartAuto = value.split(',')[0];
        this.TimeEndAuto = value.split(',')[1];
        this.SW_timeauto = value.split(',')[2];
      });
    this.fb
      .object('/set/read/setph')
      .valueChanges()
      .subscribe((value: any) => {
        this.phstart = value.split(',')[0];
        this.phend = value.split(',')[1];
      });
    this.fb
      .object('/set/read/settemp')
      .valueChanges()
      .subscribe((value: any) => {
        this.Moisturestart = value.split(',')[0];
        this.Moisturepend = value.split(',')[1];
      });
  }
  timeSetAuto = (path, data) => {
    let dt = new Date(data);
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(
      dt.getMinutes()
    )}`;
    if (path == 'start1') {
      this.TimeStartAuto = timeset;
    } else if (path == 'end1') {
      this.TimeEndAuto = timeset;
    }

    if (this.TimeStartAuto !== undefined && this.TimeEndAuto !== undefined) {
      this.fb
        .object('set/timeauto/sw1')
        .set(
          this.TimeStartAuto + ',' + this.TimeEndAuto + ',' + this.SW_timeauto
        )
        .then(() => {
          this.service.publish(
            `/timeauto`,
            `${this.TimeStartAuto},${this.TimeEndAuto},${this.SW_timeauto}`
          );
        });

      console.log(this.TimeStartAuto, this.TimeEndAuto);
    }
  };
  setph = (path, start, end) => {
    if (path === 'setph') {
      if (start <= 9 && start >= 0) {
        this.phstart = start;
      }
      if (end <= 9 && end >= 0) {
        this.phend = end;
      }

      this.fb
        .object('set/read/setph')
        .set(this.phstart + ',' + this.phend)
        .then(() => {
          this.service.publish(`/setph`, `${this.phstart},${this.phend}`);
        });
    } else {
      if (start >= 0 && start <= 100) {
        this.Moisturestart = start;
      }
      if (end >= 0 && end <= 100) {
        this.Moisturepend = end;
      }

      this.fb
        .object('set/read/settemp')
        .set(this.Moisturestart + ',' + this.Moisturepend)
        .then(() => {
          this.service.publish(
            `/settemp`,
            `${this.Moisturestart},${this.Moisturepend}`
          );
        });
    }
    console.log(path, start, end);
  };
  public Sw_on() {
    this.fb
      .object('set/timeauto/sw1')
      .set(this.TimeStartAuto + ',' + this.TimeEndAuto + ',' + this.SW_timeauto)
      .then(() => {
        this.service.publish(
          `/timeauto`,
          `${this.TimeStartAuto},${this.TimeEndAuto},${this.SW_timeauto}`
        );
      });

    console.log(this.SW_timeauto);
  }
  private zeroPad(nr, base = 10) {
    return nr;
    var len = String(base).length - String(nr).length + 1;
    //return len > 0 ? new Array(len).join('0') + nr : nr;
  }
}
