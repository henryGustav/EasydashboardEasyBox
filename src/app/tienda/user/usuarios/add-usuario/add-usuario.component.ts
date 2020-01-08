import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { SharedService } from '../../../../layouts/shared-service';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'toastr-ng2';
import { CKEditorModule } from 'ng2-ckeditor';
import { User, Address } from 'app/interfaces/models';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';
import { RolService } from '../rol-usuario/rol.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss'],
  providers: [UsuarioService, RolService]
})
export class AddUsuarioComponent implements OnInit {



  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Usuario',
      link: '/users/usuario/all',
      icon: 'fa fa-briefcase'
    },
    {
      title: 'Agregar Usuario',
      link: '',
      icon: 'fa fa-plus'
    }
  ];

  pageTitle = 'Nuevo Usuario';
  url: any = './assets/content/selectImg.png';
  public imageUploaded = false;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.usuarioService.cloudinarUpload)
  );
  public images: any[] = [];

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
  error = 0;
  fechaNacimiento = new Date();
  paisData: any = [];
  provinciasData: any = [];
  rolData: any = [];
  sexoData: any = [{
    _id: 'F',
    title: 'Femenino'
  },
  {
    _id: 'M',
    title: 'Masculino'
  }];

  constructor(public datepipe: DatePipe, private toastrService: ToastrService,
    private _sharedService: SharedService,
    public router: Router, public usuarioService: UsuarioService, public rolService: RolService) {

    this._sharedService.emitChange(this.pageTitle);

  }

  ngOnInit() {
    this.usuarioService.getPaisData().subscribe(res => {
      this.paisData = res;
      console.log(this.paisData);
    });
    this.rolService.getRolData().subscribe(res => {
      this.rolData = res;
    });
  }

  // delete Image
  deleteImage(i) {
    this.images.splice(i, 1);
    this.uploader.removeFromQueue(i);
  }

  //Save Product
  onSaveUsuario(form: NgForm) {
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.usuario.imageUrl = res.secure_url;
      if (this.usuario.imageUrl) {
        this.error = 0;
        this.usuario.birthDate = this.datepipe.transform(this.fechaNacimiento, 'dd/MM/yyyy HH:mm:ss');
        this.usuarioService.saveUserData(this.usuario).subscribe(res => {
          this.toastrService.success('Usuario Agregado Exitosamente!!!', 'Usuario');
          this.router.navigate(['users/usuario/all']);
        }, error => {
          console.log(error);
          this.toastrService.warning(error.descripcion, error.mensaje);
          this.error = 1;
          return false;
        });
      } else {
        console.log('Por favor seleccione una imagen');
      }
    };
    if (this.error == 1) {
      console.log('entro error');
      this.usuario.birthDate = this.datepipe.transform(this.fechaNacimiento, 'dd/MM/yyyy HH:mm:ss');
      this.usuarioService.saveUserData(this.usuario).subscribe(res => {
        this.toastrService.success('Usuario Agregado Exitosamente!!!', 'Usuario');
        this.router.navigate(['users/usuario/all']);
      }, error => {
        console.log(error);
        this.toastrService.warning(error.descripcion, error.mensaje);
        this.error = 1;
        return false;
      });
    }
  }



  cancel() {
    this.router.navigate(['users/usuario/all']);
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.imageUploaded = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //cargarProvincias
  onChange(event) {
    this.usuarioService.getProvinciaData(event).subscribe(res => {
      this.provinciasData = res;
    });
  }

}





