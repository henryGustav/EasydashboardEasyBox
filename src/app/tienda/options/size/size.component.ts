import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { SizeService } from './size.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  providers: [SizeService]
})
export class SizeComponent implements OnInit {
  pageTitle = 'Tamaños';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Unidad de medida',
      link: '/options/unit-size',
      icon: 'fa fa-ravelry'
    },
    {
      title: 'Tamaño',
      link: '',
      icon: 'fa fa-ravelry'
    }
  ];
  sizeData: any = [];
  idUnidad;

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public sizeService: SizeService,
    private toastr: ToastrService
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.route.params
      .map(params => params['idUnidad'])
      .subscribe(id => {
        this.idUnidad = id;
        this.sizeService.getSizeAllData(id).subscribe(res => {
          this.sizeData = res;
        });
      });
  }

  ngOnInit() {}

  addSize() {
    this.router.navigate(['options/add-size', this.idUnidad]);
  }

  editSize(key) {
    this.router.navigate(['options/update-size', this.idUnidad, key]);
  }

  onInactive(key) {
    if (confirm('Está seguro que desea inactivar el tamaño ') == true) {
      this.sizeService.inactiveSizeData(key._id).subscribe(response => {
        this.toastr.info('Tamaño desactivado...', 'Tamaño');
        this.sizeService.getSizeAllData(this.idUnidad).subscribe(response => {
          this.sizeData = response;
        });
      });
    }
  }

  onActive(key) {
    if (confirm('Está seguro que desea activar el tamaño ') == true) {
      this.sizeService.activeSizeData(key._id).subscribe(response => {
        this.toastr.info('Tamaño activado...', 'Tamaño');
        this.sizeService.getSizeAllData(this.idUnidad).subscribe(response => {
          this.sizeData = response;
        });
      });
    }
  }
}
