import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { LoginService } from './sign-in.service';
import { ToastrService } from 'toastr-ng2';
import { SocketSharedService } from '../../../SocketShare.service';

@Component({
  selector: 'page-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [LoginService, CookieService]
})
export class PageSignInComponent implements OnInit {
  login: FormGroup;
  error = false;
  errorMessage = '';
  price = 0.0;
  socket = null;
  bidValue = '';
  zone: any;
  public rememberMe = false;
  // valForm: FormGroup;
  // TOASTER
  toasterConfig: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toaster: ToastrService,
    private socketService: SocketSharedService,
    private _cookieService: CookieService) {
    this.check();
    this.getCookie();
  }

  getCookie() {
    let rememberMeData: any = {};
    rememberMeData = this._cookieService.getObject('rememberMe');
    if (rememberMeData != undefined) {
      //console.log("Remember me is ok");
      // console.log("Remember me obj "+JSON.stringify(rememberMeData));
      //this.login.get('identificacion').setValue(rememberMeData.identificacion);
      //this.login.setControl('identificacion',rememberMeData.identificacion)
      //this.login.get('password').setValue(rememberMeData.password);
    }
    else {
      //console.log("No data inside cookies");
    }
  }


  check() {
    const valid = (localStorage.getItem('token') !== null);
    if (valid) {
      this.loginService.getUsersdata()
        .subscribe((response) => {
          //console.log( 'role :' + JSON.stringify (response.role));
          localStorage.setItem('id', response._id);
          this.router.navigate(['/dashboard']);
        }), (error) => {
          this.toaster.info('Ingrese sus credenciales', 'Easy Box');
          localStorage.clear();
        };
    }
    else {
      this.toaster.info('Ingrese sus credenciales', 'Easy Box');
    }
  }

  onSubmit() {
    if (this.rememberMe) {
      //console.log("remeberMe");
      this._cookieService.putObject('rememberMe', this.login.value);
    }
    //console.log(this.login.value);
    this.loginService.loginData(this.login.value)
      .subscribe((response) => {
        localStorage.setItem('token', 'bearer ' + response.token);
        localStorage.setItem('id', response._id);
        localStorage.setItem('tokens', response.token);
        this.loginService.getUsersdata()
          .subscribe((response) => {
            //console.log( 'role :' + JSON.stringify (response.role));
            this.socketService.userInfo(response._id);
          });
        this.router.navigate(['/dashboard']);
      },
        (error) => {
          if (error.mensaje == null){
            this.toaster.error('Al momento el servidor no se encuentra disponible, si el error persiste comuníquese con nosotros', 'Sistema');
          }
          else{
            this.toaster.warning(error.mensaje, error.descripcion);
          }
        }
      );


  }

  ngOnInit(): any {
    this.buildForm();
  }

  buildForm(): void {
    let rememberMeData: any = {};
    rememberMeData = this._cookieService.getObject('rememberMe');
    if (rememberMeData != undefined) {
      //console.log("Remember me is ok");
      //console.log("Remember me obj "+JSON.stringify(rememberMeData));
      this.login = new FormGroup({
        //validacion email
        //'identificacion' : new FormControl(rememberMeData.identificacion, [ Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$")]),
        'identificacion': new FormControl(rememberMeData.identificacion, [Validators.required]),
        'password': new FormControl(rememberMeData.password, [Validators.required, Validators.minLength(4), Validators.maxLength(24)])
      });
    }
    else {
      this.login = new FormGroup({
        'identificacion': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)])
      });
      //console.log("No data inside cookies");
    }


    this.login.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.login) { return; }
    const form = this.login;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  checkMe() {
    //console.log("remember Me "+this.rememberMe);
  }


  formErrors = {
    'password': '',
    'identificacion': ''
  };

  validationMessages = {
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 24 characters long.'
    },
    'identificacion': {
      'required': 'identificacion is required.'
      //'pattern' : 'Email like : "example@abc.com"'
    }
  };

}
