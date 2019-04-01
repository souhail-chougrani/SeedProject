import { Component } from '@angular/core';
import {
  routeAnimations,
  ROUTE_ANIMATIONS_ELEMENTS
} from './core/animations/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent {
  title = 'AngularAdv';
}
