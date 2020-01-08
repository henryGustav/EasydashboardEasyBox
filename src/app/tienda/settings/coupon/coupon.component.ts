import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { CouponService } from './coupon.service';
import { ToastrService } from 'toastr-ng2';

@Component({
    selector: 'app-coupen',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss'],
    providers: [CouponService]
})
export class CouponComponent implements OnInit {
    pageTitle = 'Cupones';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Cupón',
            link: '',
            icon: 'fa fa-ravelry'
        }];
    couponData: any = [];

    constructor(private _sharedService: SharedService,
        public router: Router,
        public couponService: CouponService,
        private toastr: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
        this.couponService.getCouponData().subscribe(res => {
            this.couponData = res;
        },
        (error: Response) => {
          const err: any = error;
          const e = JSON.parse(err._body);
          this.toastr.error(e.mensaje, e.codigo);
          if (e.codigo === '401')
            this.router.navigate(['/dashboard']);
        });
    }

    addCoupon() {
        this.router.navigate(['setting/add-coupon']);
    }

    editCoupon(key) {
        this.router.navigate(['setting/update-coupon', key]);
    }

    onInactive(key) {
      if (confirm('Está seguro que desea eliminarla?') == true) {
        this.couponService.inactiveCouponData(key._id)
          .subscribe((response) => {
            this.toastr.info('Marca Eliminada...', 'Marca');
            this.couponService.getCouponData()
              .subscribe((response) => {
                this.couponData = response;
              });
          });
      }
    }

    onActive(key) {
      if (confirm('Está seguro que desea activar la Marca?') == true) {
        this.couponService.activeCouponData(key._id)
          .subscribe((response) => {
            this.toastr.info('Marca Activada...', 'Marca');
            this.couponService.getCouponData()
              .subscribe((response) => {
                this.couponData = response;
              });
          });
      }
    }
}
