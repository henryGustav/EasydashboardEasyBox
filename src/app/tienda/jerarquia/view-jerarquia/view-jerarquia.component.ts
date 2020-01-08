import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Address } from 'app/interfaces/models';
import { JerarquiaService } from '../jerarquia.service';
import { ToastrService } from 'toastr-ng2';
import { UsuarioService } from 'app/tienda/user/usuarios/usuario.service';
import { SharedService } from 'app/layouts/shared-service';

@Component({
  selector: 'app-view-jerarquia',
  templateUrl: './view-jerarquia.component.html',
  styleUrls: ['./view-jerarquia.component.scss'],
  providers: [UsuarioService, JerarquiaService]
})
export class ViewJerarquiaComponent implements OnInit {
  PageTite = 'Detalle Usuario';
  user: User = {
    nombre: '',
    apellido: '',
    identificacion: '',
    address: new Address(),
    email: '',
    gender: '',
    role: '',
    id_role: NaN,
    birthDate: '',
    imageUrl: ''
  };
  miembrosData: any = [];
  fechaNacimiento = new Date();
  userId: any;
  roleId: any;
  rol: any;
  userImage: any = 'assets/content/user.png';
  public male: any = './assets/content/boy.png';
  public female: any = './assets/content/girl.png';

  breadcrumbIcon: any = [];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    public userService: UsuarioService,
    public jerarquiaService: JerarquiaService) {
    this._sharedService.emitChange(this.PageTite);
  }

  ngOnInit() {
    this.route.params
      .map(params => params['rol'])
      .subscribe((id) => {
        this.rol = id;
        this.breadcrumbIcon = [
          {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
          },
          {
            title: 'Equipos',
            link: '/equipo/jerarquia/' + this.rol,
            icon: 'fa fa-user-o'
          },
          {
            title: 'Ver Equipo',
            link: '',
            icon: 'fa fa-search'
          }
        ];
      });
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.userId = id;
        this.userService.getUserDataByIdData(id)
          .subscribe((response) => {
            const aux: any = response;
            this.user = aux;
          }, (error) => {
            this.toastrService.error(error.descripcion, error.mensaje);
          });
      });
    this.route.params
      .map(params => params['idRol'])
      .subscribe((id) => {
        this.roleId = id;
        this.getMembersTeam(this.roleId);
      });
  }

  getMembersTeam(id: any) {
    this.jerarquiaService.getMembersDataByIdData(id)
      .subscribe((response) => {
        this.miembrosData = response;
      }, (error) => {
        this.toastrService.error(error.descripcion, error.mensaje);
      });
  }

  onDeleteMember(userTypeId: any) {
    this.jerarquiaService.deleteMemberToGroup(this.roleId, userTypeId)
      .subscribe((response) => {
        this.toastrService.info('Miembro eliminado del equipo', 'Equipo');
        this.getMembersTeam(this.roleId);
      }, (error) => {
        this.toastrService.error(error.descripcion, error.mensaje);
      });
  }

  agregarMiembro() {
    this.router.navigate(['equipo/add-jerarquia', this.rol, this.userId, this.roleId]);
  }

}
