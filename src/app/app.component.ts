import { Component } from '@angular/core';
import { SocketSharedService }from './SocketShare.service';
import { Router } from '@angular/router';
import { LoginService } from './pages/extra-pages/sign-in/sign-in.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['../assets/sass/style.scss'],
  providers: [LoginService]
})
export class AppComponent {
  constructor(public socketSharedService: SocketSharedService, private loginService: LoginService, private router: Router) {
      //  this.socketSharedService.socketConnection();
      this.socketSharedService.socketConnection();
              if (localStorage.getItem('token')){
                this.loginService.getUsersdata().subscribe((res: any) => {
                  const id =  localStorage.getItem('id');
                  this.socketSharedService.userInfo(id);
                }, (error) => {
                 localStorage.clear();
                 this.router.navigate(['/pages/sign-in']);
                });
               }
             else{
               this.router.navigate(['/pages/sign-in']);
              }

    }
}
