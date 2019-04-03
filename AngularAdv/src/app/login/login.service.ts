import { Injectable } from '@angular/core';
import { JwtService } from '../core/auth/jwt.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfo, User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable({ providedIn: 'root' })
export class LoginService {
  userInfo = new UserInfo();
  constructor(
    private http: HttpClient,
    private jwt: JwtService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  Auth(e: User) {
    // const data =
    //   'grant_type=password&username=' + username + '&password=' + password;
    const data: any = { login: e.login, password: e.password };
    return this.http.post('Auth', data).pipe(
      map((res: any) => {
        if (res) {
          this.cookieService.set('Token', res.token, null, '/');
          this.setUserInfo(res.token);
        }
      })
    );
  }

  setUserInfo(token: any) {
    const user = <UserInfo>helper.decodeToken(token);

    this.userInfo.Fonction = user.Fonction;
    this.userInfo.Prenom = user.Prenom;
    this.userInfo.Nom = user.Nom;
    this.userInfo.Code = user.Code;
    this.userInfo.Login = user.Login;
    console.log('user', user);
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('Token');
  }

  logOut() {
    this.cookieService.delete('Token', '/');
    // window.location.reload();
    this.router.navigate(['login']);
  }
  populate() {
    if (this.cookieService.check('Token')) {
      this.setUserInfo(this.cookieService.get('Token'));
    }
  }
  getdata() {
    return this.http.get('Global/Villes');
  }
}
