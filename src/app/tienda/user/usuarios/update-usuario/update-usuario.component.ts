import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { UsuarioService } from '../usuario.service';
import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
import { ToastrService } from 'toastr-ng2';
import { User, Address } from 'app/interfaces/models';
import { useAnimation } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.scss'],
  providers: [UsuarioService]
})
export class UpdateUsuarioComponent implements OnInit {
  PageTite = 'Ver Usuario';
  public usuario: User = {
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
      title: 'Actualizar Usuario',
      link: '',
      icon: 'fa fa-search'
    }
  ];

  url: any = './assets/content/selectImg.png';
  public imageUploaded = false;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.userService.cloudinarUpload)
  );

  fechaNacimiento = new Date();
  paisData: any = [];
  provinciasData: any = [];
  sexoData: any = [{
    _id: 'F',
    title: 'Femenino'
  },
  {
    _id: 'M',
    title: 'Masculino'
  }];
  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe, private toastrService: ToastrService,
    public userService: UsuarioService) {
    this._sharedService.emitChange(this.PageTite);
  }

  ngOnInit() {
    this.userService.getPaisData().subscribe(res => {
      this.paisData = res;
    });
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.userId = id;
        this.userService.getUserDataByIdData(id)
          .subscribe((response) => {
            const aux: any = response;
            this.usuario = aux;
            const digitpattern = /\d+/g;
            const matches = this.usuario.birthDate.match(digitpattern);
            this.fechaNacimiento = new Date(+matches[2], +matches[1] - 1, +matches[0], +matches[3], +matches[4], 0);
            this.userService.getProvinciaData(this.usuario.address.stateCode).subscribe(res => {
              this.provinciasData = res;
            });
            this.url = this.usuario.imageUrl;
          }
          );
      });
  }

  cancel() {
    this.router.navigate(['users/usuario/all']);
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
            this.url = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        const res: any = JSON.parse(response);
        this.usuario.imageUrl = res.secure_url;

    };
}

  //cargarProvincias
  onChange(event) {
    this.userService.getProvinciaData(event).subscribe(res => {
      this.provinciasData = res;
    });
  }

  onUpdateUsuario(form: NgForm) {
      if (this.usuario.imageUrl) {
        this.usuario.birthDate = this.datepipe.transform(this.fechaNacimiento, 'dd/MM/yyyy HH:mm:ss');
        this.userService.updateUserData(this.usuario, this.usuario._id).subscribe(res => {
          this.toastrService.success('Usuario Agregado Exitosamente!!!', 'Usuario');
          this.router.navigate(['users/usuario/all']);
        }, error => {
          console.log(error);
          this.toastrService.warning(error.descripcion, error.mensaje);
          return false;
        });
      } else {
        console.log('Por favor seleccione una imagen');
      }
  }

}
