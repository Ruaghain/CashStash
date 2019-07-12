import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlashMessage, MessageType} from './flash.message';
import {FlashService} from './flash.service';
import {Subscription} from 'rxjs';
import {Event, NavigationStart, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'wraith-flash',
  styleUrls: ['flash.component.scss'],
  templateUrl: 'flash.component.html',
  animations: [
    trigger('flashState', [
      state('show', style({
        left: '0%',
        opacity: '1',
        right: '0%'
      })),
      state('hide', style({
        left: '0%',
        opacity: '0',
        right: '0%'
      })),
      transition('* => show', animate('500ms ease-in')),
      transition('show => hide', animate('500ms ease-out'))
    ])
  ]
})

export class FlashComponent implements OnInit, OnDestroy {
  private flashMessage: FlashMessage;
  private flashVisible: boolean = false;
  private subscription: Subscription;
  private routerSubscription: Subscription;
  private timeoutSet: boolean = false;

  constructor(private flashService: FlashService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.flashService.getFlashMessage().subscribe((item: FlashMessage) => {
      this.message(item)
    });

    //Need to subscribe to the router and hide the flash message when navigating away.
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.hideFlash();
      }
    });
  }

  message(message: FlashMessage) {
    this.flashMessage = message;
    this.flashVisible = true;
    if (message.timeout > 0) {
      this.timeoutSet = true;
      setTimeout(() => {
        this.flashVisible = false;
      }, message.timeout);
    }
  }

  public getMessageType(): string {
    if (this.flashMessage) {
      return MessageType[this.flashMessage.type].toLowerCase();
    }
    return '';
  }

  public getMessage(): string {
    if (this.flashMessage) {
      return this.flashMessage.message;
    }
    return '';
  }

  public currentState(): string {
    return this.flashVisible ? 'show' : 'hide';
  }

  public hasTimeout(): boolean {
    return this.timeoutSet;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  public hideFlash(): void {
    this.flashVisible = false;
  }
}
