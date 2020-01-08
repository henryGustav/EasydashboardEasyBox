import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { UnidadesService } from '../unit-sizes.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-add-unidades',
  templateUrl: './add-unit-sizes.component.html',
  styleUrls: ['./add-unit-sizes.component.scss'],
  providers: [UnidadesService]
})
export class AddUnidadesComponent implements OnInit {
  pageTitle = 'Agregar Unidad';
  progress = false;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Unidades',
      link: '/options/unit-size',
      icon: 'fa fa-clone'
    },
    {
      title: 'Agregar Unidad',
      link: '',
      icon: 'fa fa-plus'
    }
  ];
  public unidades: any = {
    title: '',
    codigo: '',
    shortDescription: '',
    estado: 1,
    subUnidad: []
  };

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public unidadesService: UnidadesService
  ) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {}

  onSaveUnidad(form: NgForm) {
    this.progress = !this.progress;
    this.unidadesService.saveUnidadData(this.unidades).subscribe(
      res => {
        this.progress = !this.progress;
        this.toastr.success('Unidad agregada...', 'Unidad');
        this.router.navigate(['/options/unit-size']);
      },
      error => {
        this.progress = !this.progress;
        this.toastr.error(error.mensaje, error.codigo);
      }
    );
  }

  cancel() {
    this.router.navigate(['/options/unit-size']);
  }
}
