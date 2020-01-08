import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'toastr-ng2';
import { JerarquiaService } from './jerarquia.service';
import { SharedService } from 'app/layouts/shared-service';
import { RolesService } from 'app/tienda/roles/roles.service';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.scss'],
  providers: [JerarquiaService, RolesService]
})
export class JerarquiaComponent implements OnInit {
  PageTite = 'Equipos';

  loading = false;
  errorImg = false;
  errorImage = './assets/content/error.png';

  url: any = './assets/content/nodata_cloud.png';

  public filterQuery = '';
  userData: any = [];
  rolData: any = [];
  idRol: number;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Equipos',
      link: '',
      icon: 'fa fa-user-o'
    }
  ];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public usuarioService: JerarquiaService,
    public rolesService: RolesService,
    private toastrService: ToastrService) {
    this._sharedService.emitChange(this.PageTite);
    this.getRolData();


  }

  ngOnInit() {
    //this.model.idRol = 3;
   this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
       if (id === undefined) return;
        this.idRol = +id;
        this.onChange(this.idRol);
      });
  }

  getRolData() {
    this.loading = !(this.loading);
    this.rolesService.getRolData().subscribe(res => {
      this.rolData = res;
      this.loading = !(this.loading);
    }, (error) => {
      this.loading = !(this.loading);
      this.toastrService.error(error.descripcion, error.mensaje);
    });
  }

  onChange(event) {
    this.getUserDataByType(event);
  }

  getUserDataByType(idTipo: any) {
    if (idTipo === undefined) return;
    this.loading = !(this.loading);
    this.usuarioService.getUserDataByType(idTipo).subscribe(res => {
      this.userData = res;
      this.loading = !(this.loading);
      if (this.userData.length == 0) {
        this.toastrService.warning('No se han encontrado resultados', 'Usuarios');
      }
    }, (error) => {
      this.loading = !(this.loading);
      this.toastrService.error(error.descripcion, error.mensaje);

    });
  }

  onViewEquipo(key, rolKey) {
    this.router.navigate(['equipo/view-jerarquia', this.idRol, key, rolKey]);
  }
}

