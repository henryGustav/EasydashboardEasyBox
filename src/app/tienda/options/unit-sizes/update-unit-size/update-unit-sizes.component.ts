import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { UnidadesService } from '../unit-sizes.service';
import { ToastrService } from 'toastr-ng2';


@Component({
  selector: 'app-update-unidades',
  templateUrl: './update-unit-sizes.component.html',
  styleUrls: ['./update-unit-sizes.component.scss'],
  providers: [UnidadesService]
})
export class UpdateUnidadesComponent implements OnInit {
  pageTitle = 'Actualizar Unidad de Mado';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Unidades de Medida',
      link: '/options/unit-size',
      icon: 'fa fa-clone'
    },
    {
      title: 'Actualizar-Unidad- Medida',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];
  public unidades: any = {
    title: '',
    imageUrl: '',
    shortDescription: '',
    estado: 1
  };

  categoryId: any;
  cargando = false;


  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public unidadService: UnidadesService) {

    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.categoryId = id;
        this.unidadService.getUnidadDetails(id)
          .subscribe((response) => {
            this.unidades = response;
          });
      });
  }


  onUpdateUnidad(form: NgForm) {
    // this.unidades.imageUrl = 'https://localhost';
    this.unidadService.UpdateUnidadData(this.unidades, this.categoryId)
      .subscribe(res => {
        this.toastr.success('Categoría Actualizada...', 'Categoría');
        this.router.navigate(['/options/unit-size']);
      },
        error => {
          this.toastr.error(error.mensaje, error.codigo);
        });
  }

  cancel() {
    this.router.navigate(['/options/unit-size']);
  }
}
