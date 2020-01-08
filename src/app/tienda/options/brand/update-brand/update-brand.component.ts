import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {BrandService} from '../brand.service';
import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-update-brand',
    templateUrl: './update-brand.component.html',
    styleUrls: ['./update-brand.component.scss'],
    providers: [BrandService]
})
export class UpdateBrandComponent implements OnInit {
    pageTitle = 'Actualizar Marca';
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
            title: 'Actualizar',
            link: '',
            icon: 'fa fa-pencil'
        }
    ];
    brands = {
        title: '',
        codigo: ''
    };
    brandId: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public brandService: BrandService,
                private toastr: ToastrService, ) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.brandId = id;
                this.brandService.getBrandDetails(id)
                    .subscribe((response) => {
                        this.brands = response;
                    });
            });
    }

    onUpdateBrand(form: NgForm) {
        this.brandService.UpdateBrandData(this.brands, this.brandId)
            .subscribe(res => {
                this.toastr.success('Marca Actualizada Correctamente', 'Marca');
                this.router.navigate(['/options/brand']);
            }, error => {
              const e = error.json();
              this.toastr.error(e.mensaje, e.codigo);
            });
    }

    cancel() {
        this.router.navigate(['/options/brand']);
    }

}
