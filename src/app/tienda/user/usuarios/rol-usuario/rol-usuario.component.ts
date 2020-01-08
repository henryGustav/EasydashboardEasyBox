import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'toastr-ng2';
import { SharedService } from 'app/layouts/shared-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { RolService } from './rol.service';


@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.scss'],
  providers: [RolService, UsuarioService]
})
export class RolUsuarioComponent implements OnInit {

  pageTitle = 'Roles';
  loading = false;
  errorImg = false;
  errorImage = './assets/content/error.png';
  userId;
  url: any = './assets/content/nodata_cloud.png';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Usuarios',
      link: '/users/usuario/all',
      icon: 'fa fa-user-o'
    },
    {
      title: 'Roles',
      link: '',
      icon: 'fa fa-plus'
    }
  ];

  rolData: any = [];
  constructor(private toastr: ToastrService,
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    public router: Router,
    private rolService: RolService,
    private userService: UsuarioService,
    private changeDetector: ChangeDetectorRef) {

    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.userId = id;
        this.getSavedRolData(id);
      });
    this._sharedService.emitChange(this.pageTitle);
  }

  //ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'true'. Current value: 'false'.
  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
  }



  getSavedRolData(id) {  //get saved product Data
    this.rolService.getUserRolData(id)
      .subscribe((response) => {
        this.rolData = response;
      }, error => {
        console.log(error);
        this.toastr.warning(error.descripcion, error.mensaje);
      }
      );
  }

  onSaveRoles(form: NgForm) {
    console.log(this.rolData);
    this.userService.updateRolUserData(this.rolData, this.userId)
    .subscribe((response) => {
      this.toastr.success('Rol Actualizado Exitosamente!!!', 'Usuario');
          this.router.navigate(['users/usuario/all']);
    }, error => {
      console.log(error);
      this.toastr.warning(error.descripcion, error.mensaje);
    }
  );

  }


  cancel() {
    this.router.navigate(['users/usuario/all']);
  }
}
