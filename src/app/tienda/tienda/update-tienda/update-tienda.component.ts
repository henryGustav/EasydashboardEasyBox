import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { TiendaService } from '../tienda.service';
import { ToastrService } from 'toastr-ng2';
import { Tienda } from 'app/interfaces/models';

@Component({
  selector: 'app-update-tienda',
  templateUrl: './update-tienda.component.html',
  styleUrls: ['./update-tienda.component.scss'],
  providers: [TiendaService]
})
export class UpdateTiendaComponent implements OnInit {
  pageTitle = 'Actualizar Tienda';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Tiendas',
      link: '/tienda/all',
      icon: 'fa fa-clone'
    },
    {
      title: 'Actualizar-Tienda',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];
  public tienda: any = {
    title: '',
    imageUrl: '',
    shortDescription: '',
    estado: 1
  };

  tiendaId: any;
  cargando = false;
  url: any = './assets/content/selectImg.png';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.tiendaService.cloudinarUpload)
  );

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public tiendaService: TiendaService
  ) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe(id => {
      this.tiendaId = id;
      this.tiendaService.getTiendaDetails(id).subscribe(response => {
        this.tienda = response;
        this.url = this.tienda.imageUrl;
      });
    });
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
    this.cargando = true;
    this.uploader.onSuccessItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ): any => {
      const res: any = JSON.parse(response);
      this.tienda.imageUrl = res.secure_url;
      this.cargando = false;
    };
  }

  onUpdateTienda(form: NgForm) {
    console.log(this.tienda);
    if (this.tienda.imageUrl) {
      this.tiendaService.updateTiendaData(this.tienda, this.tiendaId).subscribe(
        res => {
          this.toastr.success('Tienda Actualizada...', this.pageTitle);
          this.router.navigate(['/tienda/all']);
        },
        error => {
          this.toastr.error(error.mensaje, error.codigo);
        }
      );
    }
    else{
      this.toastr.error('No se ha cargado una imagen', this.pageTitle);
    }
  }

  cancel() {
    this.router.navigate(['/tienda/all']);
  }
}
