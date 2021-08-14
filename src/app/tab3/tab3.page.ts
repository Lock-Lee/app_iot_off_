import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public TimeStart1;
  public TimeEnd1;
  public TimeStart2;
  public TimeEnd2;

  public TimephStart1;
  public TimephEnd1;
  public TimephStart2;
  public TimephEnd2;

  public SW_time1;
  public SW_time2;
  public SW_time3;
  public SW_time4;
  constructor(public service: AppService, public fb: AngularFireDatabase) {}
  ngOnInit() {
    this.fb
      .object('set/time1')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.TimeStart1 = value.split(',')[0];
        this.TimeEnd1 = value.split(',')[1];
        this.SW_time1 = value.split(',')[2];
      });
    this.fb
      .object('/set/time2')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.TimeStart2 = value.split(',')[0];
        this.TimeEnd2 = value.split(',')[1];
        this.SW_time2 = value.split(',')[2];
      });
    this.fb
      .object('/set/timeph1')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.TimephStart1 = value.split(',')[0];
        this.TimephEnd1 = value.split(',')[1];
        this.SW_time3 = value.split(',')[2];
      });
    this.fb
      .object('/set/timeph2')
      .valueChanges()
      .subscribe((value: any) => {
        console.log(value);
        this.TimephStart2 = value.split(',')[0];
        this.TimephEnd2 = value.split(',')[1];
        this.SW_time4 = value.split(',')[2];
      });
  }
  timeSet1 = (path, data) => {
    console.log(path, data);
    let dt = new Date(data);
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(
      dt.getMinutes()
    )}`;
    if (path == 'start1') {
      this.TimeStart1 = timeset;
    } else if (path == 'end1') {
      this.TimeEnd1 = timeset;
    } else if (path == 'start2') {
      this.TimeStart2 = timeset;
    } else if (path == 'end2') {
      this.TimeEnd2 = timeset;
    }

    if (this.TimeStart1 !== undefined && this.TimeEnd1 !== undefined) {
      this.fb
        .object('set/time1')
        .set(this.TimeStart1 + ',' + this.TimeEnd1 + ',' + this.SW_time1)
        .then(() => {
          this.service.publish(
            `/time1`,
            `${this.TimeStart1},${this.TimeEnd1},${this.SW_time1}`
          );
        });

      console.log(this.TimeStart1, this.TimeEnd1);
    }
    if (this.TimeStart2 !== undefined && this.TimeEnd2 !== undefined) {
      this.fb
        .object('set/time2')
        .set(this.TimeStart2 + ',' + this.TimeEnd2 + ',' + this.SW_time2)
        .then(() => {
          this.service.publish(
            `/time2`,
            `${this.TimeStart2},${this.TimeEnd2},${this.SW_time2}`
          );
        });

      console.log(this.TimeStart2, this.TimeEnd2);
    }
  };
  timeSetph = (path, data) => {
    console.log(path, data);

    let dt = new Date(data);
    let timeset = `${this.zeroPad(dt.getHours())}:${this.zeroPad(
      dt.getMinutes()
    )}`;
    if (path == 'start1') {
      this.TimephStart1 = timeset;
    } else if (path == 'end1') {
      this.TimephEnd1 = timeset;
    } else if (path == 'start2') {
      this.TimephStart2 = timeset;
    } else if (path == 'end2') {
      this.TimephEnd2 = timeset;
    }

    if (this.TimephStart1 !== undefined && this.TimephEnd1 !== undefined) {
      this.fb
        .object('set/timeph1')
        .set(this.TimephStart1 + ',' + this.TimephEnd1 + ',' + this.SW_time3)
        .then(() => {
          this.service.publish(
            `/timeph1`,
            `${this.TimephStart1},${this.TimephEnd1},${this.SW_time3}`
          );
        });

      console.log(this.TimephStart1, this.TimephEnd1);
    }
    if (this.TimephStart2 !== undefined && this.TimephEnd2 !== undefined) {
      this.fb
        .object('set/timeph2')
        .set(this.TimephStart2 + ',' + this.TimephEnd2 + ',' + this.SW_time4)
        .then(() => {
          this.service.publish(
            `/timeph2`,
            `${this.TimephStart2},${this.TimephEnd2},${this.SW_time4}`
          );
        });

      console.log(this.TimephStart2, this.TimephEnd2);
    }
  };
  public Sw_on1() {
    this.fb
      .object('set/time1')
      .set(this.TimeStart1 + ',' + this.TimeEnd1 + ',' + this.SW_time1)
      .then(() => {
        this.service.publish(
          `/time1`,
          `${this.TimeStart1},${this.TimeEnd1},${this.SW_time1}`
        );
      });
  }
  public Sw_on2() {
    this.fb
      .object('set/time2')
      .set(this.TimeStart2 + ',' + this.TimeEnd2 + ',' + this.SW_time2)
      .then(() => {
        this.service.publish(
          `/time2`,
          `${this.TimeStart2},${this.TimeEnd2},${this.SW_time2}`
        );
      });
  }

  public Sw_on3() {
    this.fb
      .object('set/timeph1')
      .set(this.TimephStart1 + ',' + this.TimephEnd1 + ',' + this.SW_time3)
      .then(() => {
        this.service.publish(
          `/timeph1`,
          `${this.TimephStart1},${this.TimephEnd1},${this.SW_time3}`
        );
      });
  }
  public Sw_on4() {
    this.fb
      .object('set/timeph2')
      .set(this.TimephStart2 + ',' + this.TimephEnd2 + ',' + this.SW_time4)
      .then(() => {
        this.service.publish(
          `/timeph2`,
          `${this.TimephStart2},${this.TimephEnd2},${this.SW_time4}`
        );
      });
  }
  private zeroPad(nr, base = 10) {
    return nr;
    var len = String(base).length - String(nr).length + 1;
    //return len > 0 ? new Array(len).join('0') + nr : nr;
  }
}
