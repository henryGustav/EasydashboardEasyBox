import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {SizeService} from '../size.service';
import {ToastrService} from 'toastr-ng2';
import { ProductSize } from 'app/interfaces/models';

@Component({
    selector: 'app-add-size',
    templateUrl: './add-size.component.html',
    styleUrls: ['./add-size.component.scss'],
    providers: [SizeService]
})
export class AddSizeComponent implements OnInit {
    pageTitle = 'Add Size';
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
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    sizes: ProductSize = {
        title: '',
        sizeShortName: '',
        estado: 1
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                public route: ActivatedRoute,
                public sizeService: SizeService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
        this.route.params
      .map(params => params['idUnidad'])
      .subscribe(id => {
        this.idUnidad = id;
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
      });
    }

    ngOnInit() {
    }

    onSaveSize(form: NgForm) {
        this.sizes.unityId = this.idUnidad;
        this.sizeService.saveSizeData(this.sizes).subscribe(res => {
            this.toastrService.success('Tamaño Agregado Correctamente!!!', 'Tamaño');
            this.router.navigate(['/options/size', this.idUnidad]);
        }, error => {
          this.toastrService.error(error.mensaje, error.codigo);
        });
    }

    cancel() {
        this.router.navigate(['/options/size', this.idUnidad]);
    }

}
