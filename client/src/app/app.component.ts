import {I18nService} from './components/i18n/i18n.service';
import {Component, isDevMode, OnInit} from '@angular/core';
import './app.component.global.scss';

@Component({
  selector: 'cash-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
    if (isDevMode()) {
      console.log('👋 Development Mode!');
    }
    this.i18nService.use('en');
  }
}
