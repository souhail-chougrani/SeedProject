import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../core/core.state';
import { Store } from '@ngrx/store';
import { ActionAuthLogout } from '../core/auth/auth.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      tap(res => console.log('breakPoint', res)),
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>
  ) {}
  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }
}
