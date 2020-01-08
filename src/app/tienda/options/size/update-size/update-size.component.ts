import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { SizeService } from '../size.service';
import { ToastrService } from 'toastr-ng2';
import { ProductSize } from 'app/interfaces/models';

@Component({
  selector: 'app-update-size',
  templateUrl: './update-size.component.html',
  styleUrls: ['./update-size.component.scss'],
  providers: [SizeService]
})
export class UpdateSizeComponent implements OnInit {
  pageTitle = 'Update Size';
  idUnidad;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Size',
      link: '/options/size/' + this.idUnidad,
      icon: 'fa fa-ravelry'
    },
    {
      title: 'Update',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];

  sizes: ProductSize = {
    title: '',
    sizeShortName: '',
    codigo: ''
  };
  sizeId: any;

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public sizeService: SizeService,
    private toastrService: ToastrService
  ) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.idUnidad = this.route.snapshot.params['idUnidad'];
    this.breadcrumbIcon = [
      {
        title: 'Inicio',
        link: '/dashboard',
        icon: 'fa fa-home'
      },
      {
        title: 'Size',
        link: '/options/size/' + this.idUnidad,
        icon: 'fa fa-ravelry'
      },
      {
        title: 'Update',
        link: '',
        icon: 'fa fa-pencil'
      }
    ];
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.sizeId = id;
        this.sizeService.getSizeDetails(id).subscribe(response => {
          console.log(response);
          this.sizes = response;
        });
      });
  }

  onUpdateSize(form: NgForm) {
    this.sizeService.UpdateSizeData(this.sizes, this.sizeId).subscribe(
      res => {
        this.toastrService.success(
          'Tamaño Actualizado Correctamente!!!',
          'Tamaño'
        );
        this.router.navigate(['/options/size', this.idUnidad]);
      },
      error => {
        const e = error.json();
        this.toastrService.error(e.mensaje, e.codigo);
      }
    );
  }

  cancel() {
    this.router.navigate(['/options/size', this.idUnidad]);
  }
}
