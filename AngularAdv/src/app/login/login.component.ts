import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core/core.state';
import { selectIsAuthenticated } from '../core/auth/auth.reducer';
import { ActionAuthLogin, ActionAuthLogout } from '../core/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storageService.testLocalStorage();

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }
}
