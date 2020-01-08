import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {TaxService} from '../tax.service';
import {ToastrService} from 'toastr-ng2';


@Component({
    selector: 'app-add-tax',
    templateUrl: './add-tax.component.html',
    styleUrls: ['./add-tax.component.scss'],
    providers: [TaxService]
})
export class AddTaxComponent implements OnInit {
    pageTitle = 'Agregar Impuesto';
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
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    tax: any = {
        title: '', estado : 1, porcentaje: 0, codigo: ''
    };

    constructor(private _sharedService: SharedService,
                public router: Router,
                public taxService: TaxService,
                private toastrService: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    onSaveTax(form: NgForm) {
        this.taxService.saveTaxData(this.tax)
            .subscribe(res => {
                this.toastrService.success('Impuesto Agregado Correctamente!!!', 'Impuesto');
                this.router.navigate(['/setting/tax']);
            },
          error => {
            console.log(error);
            this.toastrService.error(error.mensaje, error.codigo);
          });
    }

    cancel() {
        this.router.navigate(['/setting/tax']);
    }

}
