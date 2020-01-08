import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {TaxService} from '../tax.service';
import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-update-tax',
    templateUrl: './update-tax.component.html',
    styleUrls: ['./update-tax.component.scss'],
    providers: [TaxService]
})
export class UpdateTaxComponent implements OnInit {
    pageTitle = 'Actualizar Impuesto';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Impuestos',
            link: '/setting/tax',
            icon: 'fa fa-ravelry'
        },
        {
            title: 'Actualizar',
            link: '',
            icon: 'fa fa-pencil'
        }
    ];
    tax = {
        title: '',
        codigo: '',
        porcentaje: ''
    };
    taxId: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public brandService: TaxService,
                private toastr: ToastrService, ) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.taxId = id;
                this.brandService.getTaxDetails(id)
                    .subscribe((response) => {
                        this.tax = response;
                    });
            });
    }

    onUpdateTax(form: NgForm) {
        this.brandService.UpdateTaxData(this.tax, this.taxId)
            .subscribe(res => {
                this.toastr.success('Impuesto Actualizado Correctamente', 'Impuesto');
                this.router.navigate(['/setting/tax']);
            });
    }

    cancel() {
        this.router.navigate(['/setting/tax']);
    }

}
