import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { UsuarioService } from '../usuario.service';
import { User, Address } from 'app/interfaces/models';

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrls: ['./view-usuario.component.scss'],
  providers: [UsuarioService]
})
export class ViewUsuarioComponent implements OnInit {
  PageTite = 'Detalle Usuario';
  user: any = {
    nombre: '',
    apellido: '',
    identificacion: '',
    address: new Address(),
    email: '',
    gender: '',
    role: '',
    id_role: NaN,
    birthDate: '',
    imageUrl: '',
    roles: []
  };
  fechaNacimiento = new Date();
  userId: any;
  userImage: any = 'assets/content/user.png';
  public male: any = './assets/content/boy.png';
  public female: any = './assets/content/girl.png';
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
      title: 'Ver Usuario',
      link: '',
      icon: 'fa fa-search'
    }
  ];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public userService: UsuarioService) {
    this._sharedService.emitChange(this.PageTite);
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.userId = id;
        this.userService.getUserDataByIdData(id)
          .subscribe((response) => {
            const aux: any = response;
            this.user = aux;
            const digitpattern = /\d+/g;
            const matches = this.user.birthDate.match(digitpattern);
            this.fechaNacimiento = new Date(+matches[2], +matches[1] - 1, +matches[0], +matches[3], +matches[4], 0);
          }
          );
      });
  }

}
