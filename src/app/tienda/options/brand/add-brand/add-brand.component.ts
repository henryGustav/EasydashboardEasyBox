import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {BrandService} from '../brand.service';
import {ToastrService} from 'toastr-ng2';
import { Brand } from 'app/interfaces/models';

@Component({
    selector: 'app-add-brand',
    templateUrl: './add-brand.component.html',
    styleUrls: ['./add-brand.component.scss'],
    providers: [BrandService]
})
export class AddBrandComponent implements OnInit {
    pageTitle = 'Agregar Marca';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Colecciones',
            link: '/options/brand',
            icon: 'fa fa-ravelry'
        },
        {
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    brands: Brand = {
        title: '', estado : 1
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                public brandService: BrandService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    onSaveBrand(form: NgForm) {
        this.brandService.saveBrandData(this.brands)
            .subscribe(res => {
                this.toastrService.success('Marca Agregada Correctamente!!!', 'Marca');
                this.router.navigate(['/options/brand']);
            },
          error => {
            const e = error.json();
            this.toastrService.error(e.mensaje, e.codigo);
          });
    }

    cancel() {
        this.router.navigate(['/options/brand']);
    }

}
