import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PrefixApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Intercp');
    req = req.clone({ url: environment.api + req.url });
    return next.handle(req);
  }
}
