import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtService } from '../auth/jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  AUTH_HEADER = 'Authorization';
  token: any;
  constructor(private cookieService: CookieService) {
    this.token = this.cookieService.get('Token');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }
    req = this.addAuthenticationToken(req);

    return next.handle(req);
  }

  private addAuthenticationToken(req: HttpRequest<any>) {
    if (!this.token) {
      return req;
    }
    if (!req.url.match(environment.api)) {
      return req;
    }

    return req.clone({
      headers: req.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
    });
  }
}
