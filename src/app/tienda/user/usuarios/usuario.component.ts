import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {UsuarioService} from './usuario.service';
import { ToastrService } from 'toastr-ng2';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss'],
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
    PageTite = 'Usuarios';

    loading = false;
    errorImg = false;
    errorImage = './assets/content/error.png';

    arrayLength: number;
    url: any = './assets/content/nodata_cloud.png';

    public filterQuery = '';
    userData: any = [];
    dtOptions: any = {};
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Usuarios',
            link: '',
            icon: 'fa fa-user-o'
        }
    ];

    constructor(private _sharedService: SharedService,
                public router: Router,
                public usuarioService: UsuarioService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.PageTite);
        this.getUserData();
    }

    ngOnInit() {
      this.dtOptions = {
        // Declare the use of the extension in the dom parameter
        dom: 'Bfrtip',
        // Configure the buttons
        buttons: [
          'copy',
          'print',
          'excel',
          'csvHtml5',
          'pdfHtml5'
        ],
        pagingType: 'full_numbers',
        pageLength: 30,
      };


    }

    getUserData() {
        this.loading = !(this.loading);
        this.usuarioService.getUserData().subscribe(res => {
            this.userData = res;
            this.arrayLength = this.userData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;


        });
    }


    addUsuario() {
      this.router.navigate(['users/usuario/add']);
  }

  onDeleteUsuario(key, ind) {
      if (confirm('Desea eliminar el usuario?') == true) {
          this.usuarioService.deleteUserData(key)
              .subscribe((response) => {
                  this.toastrService.info('Usuario eliminado...', 'Usuario');
                  this.userData.splice(ind, 1);
              });
      }
  }


  onEditUsuario(key) {
      this.router.navigate(['users/update-usuario', key]);
  }

  onEditRole(key) {
    console.log(key);
    this.router.navigate(['users/rol-usuario', key]);
  }

  onViewUsuario(key) {
      this.router.navigate(['users/view-usuario', key]);
  }
}
