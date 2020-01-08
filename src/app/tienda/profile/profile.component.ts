import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  pageTitle = 'Ajustes';
  password: any = {
    _id: '',
    nombre: '',
    password: ''
  };

  updateEmail: any = {
    flag: 0,
    _id: '',
    email: ''
  };

  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Ajustes',
      link: '',
      icon: 'fa fa-cog'
    }
  ];

  constructor(private restService: ProfileService, private _sharedService: SharedService, private router: Router, private toastrService: ToastrService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  onUpdatePassword(ngform: NgForm) {
    this.password._id = localStorage.getItem('id');
    this.restService.updatePassword(this.password).subscribe((res) => {
      this.toastrService.success('Password Actualizado...', 'Ajuste!!!');
      this.password.nombre = '';
      this.password.password = '';
    }, (error) => {
      if (error.codigo === '401') {
        this.router.navigate(['/dashboard']);
      }
      this.toastrService.error(error.mensaje, error.codigo);
      this.password.nombre = '';
      this.password.password = '';
    });

  }


  onUpdateEmail(ngform: NgForm) {
    this.updateEmail._id = localStorage.getItem('id');
    this.restService.updateEmail(this.updateEmail).subscribe(res => {
      if (res.message) {
        this.updateEmail.email = '';
        this.toastrService.success('Email updated', res.message);
      }
      else {
        this.toastrService.success('Email updated', 'Success');
        this.updateEmail.email = '';
      }
    }, (error) => {
      if (error.codigo === '401') {
        this.router.navigate(['/dashboard']);
      }
      this.updateEmail.email = '';
      this.toastrService.error(error.mensaje, error.codigo);
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
