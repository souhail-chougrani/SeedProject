import { Component, OnInit, Input } from '@angular/core';
import { Nav, nav } from '../routers';
import { Router } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  Title: any;
  name: string;
  menu: Nav[] = [];
  breadcrumbList: Nav[] = [];
  constructor(private _router: Router) {}

  ngOnInit() {
    console.log('test');
    this.menu = nav;
    this.listenRouting();
  }

  listenRouting() {
    console.log('sss');
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      console.log('Test', router);

      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        target = this.menu;
        this.breadcrumbList.length = 0;
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          target = target.find(page => page.path.slice(2) === router);
          this.breadcrumbList.push({
            name: target.name,
            path:
              index === 0
                ? target.path
                : `${this.breadcrumbList[index - 1].path}/${target.path.slice(
                    2
                  )}`
          });

          if (index + 1 !== routerList.length) {
            target = target.children;
          }
        });

        console.log(this.breadcrumbList);
      }
    });
  }
}
