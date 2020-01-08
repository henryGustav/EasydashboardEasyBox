import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { BrandService } from './brand.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers: [BrandService]
})
export class BrandComponent implements OnInit {
  pageTitle = 'Colecciones';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Colecciones',
      link: '',
      icon: 'fa fa-ravelry'
    }
  ];
  brandData: any = [];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public brandService: BrandService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.brandService.getBrandAllData().subscribe(res => {
      this.brandData = res;
    },
      (error: Response) => {
        const err: any = error;
        const e = JSON.parse(err._body);
        this.toastr.error(e.mensaje, e.codigo);
        if (e.codigo === '401')
          this.router.navigate(['/dashboard']);
      });
  }

  addBrand() {
    this.router.navigate(['options/add-brand']);
  }

  editBrand(key) {
    this.router.navigate(['options/update-brand', key]);
  }

  onInactive(key) {
    if (confirm('Está seguro que desea eliminarla?') == true) {
      this.brandService.deleteBrandData(key._id)
        .subscribe((response) => {
          this.toastr.info('Marca Eliminada...', 'Marca');
          this.brandService.getBrandAllData()
            .subscribe((response) => {
              this.brandData = response;
            });
        });
    }
  }

  onActive(key) {
    if (confirm('Está seguro que desea activar la Marca?') == true) {
      this.brandService.activeBrandData(key._id)
        .subscribe((response) => {
          this.toastr.info('Marca Activada...', 'Marca');
          this.brandService.getBrandAllData()
            .subscribe((response) => {
              this.brandData = response;
            });
        });
    }
  }

}
