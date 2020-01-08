import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { CouponService } from '../coupon.service';
import { ToastrService } from 'toastr-ng2';
@Component({
    selector: 'app-add-coupon',
    templateUrl: './add-coupon.component.html',
    styleUrls: ['./add-coupon.component.scss'],
    providers: [CouponService]
})
export class AddCouponComponent implements OnInit {
    pageTitle = 'Agregar Cupón';
    statusChecked: boolean;
    minDate: string;
    @ViewChild('f') f: NgForm;
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Cupón',
            link: '/setting/coupon',
            icon: 'fa fa-ravelry'
        },
        {
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];


    constructor(private _sharedService: SharedService,
        public router: Router,
        public couponService: CouponService,
        private toastrService: ToastrService) {
    //    this.minDate = new Date().toISOString().split('T')[0];
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }

    checkedVal(event) {
        if (event === true) {
            this.statusChecked = true;
        } else {
            this.statusChecked = false;
        }
    }

    onSaveCoupon() {
        const body = {
          title: this.f.value.title,
          code: this.f.value.code,
          description: this.f.value.description,
          minMount: this.f.value.minMount,
          mount: this.f.value.mount,
          estado: 1
        };

        this.couponService.saveCouponData(body).subscribe(res => {
            this.toastrService.success('Actualizado', 'Cupón agregado exitosamente', { timeOut: 2000 });
            this.f.reset();
            this.router.navigate(['setting/coupon']);
        },
        (error: Response) => {
          const err: any = error;
          const e = JSON.parse(err._body);
          this.toastrService.error(e.mensaje, e.codigo);
          if (e.codigo === '401')
            this.router.navigate(['/dashboard']);
        });
    }

    cancel() {
        this.router.navigate(['/setting/coupon']);
    }
}
