import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { TiendaService } from '../tienda.service';
import { ToastrService } from 'toastr-ng2';
import { Tienda } from 'app/interfaces/models';

@Component({
  selector: 'app-add-tienda',
  templateUrl: './add-tienda.component.html',
  styleUrls: ['./add-tienda.component.scss'],
  providers: [TiendaService]
})
export class AddTiendaComponent implements OnInit {
  pageTitle = 'Agregar Tienda';
  progress = false;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Tienda',
      link: '/tienda/all',
      icon: 'fa fa-clone'
    },
    {
      title: 'Agregar Tienda',
      link: '',
      icon: 'fa fa-plus'
    }
  ];
  public tienda: Tienda = {
    codigo: '',
    ruc: '',
    title: '',
    imageUrl: '',
    shortDescription: '',
    telefono: '',
    celular: '',
    email: '',
    estado: 1
  };

  public imageUploaded = false;
  url: any = './assets/content/selectImg.png';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.tiendaService.cloudinarUpload)
  );
  sts = 0;

  constructor(private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public tiendaService: TiendaService) {

    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
  }


  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.imageUploaded = true;
        this.sts = 1;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSaveTienda(form: NgForm) {
    //this.tienda.imageUrl = "https://localhost";
    this.progress = !(this.progress);
    if (this.sts == 1) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        this.sts = 0;
        const res: any = JSON.parse(response);
        this.tienda.imageUrl = res.secure_url;
        this.tiendaService.saveTiendaData(this.tienda).subscribe(res => {
          this.progress = !(this.progress);
          this.toastr.success('Tienda agregada...', 'Tienda');
          this.router.navigate(['/tienda/all']);
        },
          error => {
            this.progress = !(this.progress);
            this.toastr.error(error.mensaje, error.codigo);
          });
      };
    }
    else {
      this.tiendaService.saveTiendaData(this.tienda).subscribe(res => {
        this.progress = !(this.progress);
        this.toastr.success('Tienda agregada...', 'Tienda');
        this.router.navigate(['/tienda/all']);
      },
        error => {
          this.progress = !(this.progress);
          this.toastr.error(error.mensaje, error.codigo);
        });
    }
  }

  cancel() {
    this.router.navigate(['/tienda/all']);
  }
}
