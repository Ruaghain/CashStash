// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet, Event } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Component, Directive, Injectable, Input } from '@angular/core';
import { NavigationExtras, NavigationStart } from '@angular/router';
// Only implements params and part of snapshot.params
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {
  private url: string;

  navigate(commands: any[], extras?: NavigationExtras) {
  }

  navigateByUrl(url: string, extras?: NavigationExtras) {
    this.url = url;
  }

  private navigationStart = new NavigationStart(0, 'http://www.test.com');
  public events = new Observable((observer: any) => {
    observer.next(this.navigationStart);
    observer.complete();
  });
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() {
    return this._testParams;
  }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.data
  get snapshot() {
    return { data: this.testParams };
  }
}
