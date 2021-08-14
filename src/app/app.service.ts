import { Injectable, OnInit } from '@angular/core';

const _window: any = window;

var microgear = _window.Microgear.create({
  key: 'xv4HY6mKMhDkP2a',
  secret: 'Dfgf23P2QIqPy7M4tGUVuf6a7',
  alias: 'Ionic' /*  optional  */,
});

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnInit {
  public status: any = [];
  constructor() {
    this.ngOnInit();
    microgear.connect('NUTTACIT');

    microgear.on('connected', () => {
      microgear.subscribe('/esp/+');
      microgear.subscribe('/ionic/+');
      microgear.subscribe('/esp/th/+');
      microgear.subscribe('esp/th/++');

      console.log('Ss');
    });
    microgear.on('disconnected', () => {});

    microgear.on('absent', function (event) {
      console.log(event);
    });

    microgear.on('present', (event) => {
      this.status = event;
      console.log(this.status);
    });
  }

  public ngOnInit = () => {};

  message = (value) => {
    microgear.on('message', (topic, msg) => {
      value({ topic: topic, message: msg });

      // console.log(topic+ " "+msg);
    });
  };

  publish = (topic, message) => {
    console.log(topic, '=>', message);

    microgear.publish('/ionic' + topic, message);
  };
}
