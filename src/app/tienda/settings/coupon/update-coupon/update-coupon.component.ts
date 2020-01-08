import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { CouponService } from '../coupon.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.scss'],
  providers: [CouponService]
})
export class UpdateCouponComponent implements OnInit {
  pageTitle = 'Actualizar Cupón';

  statusChecked: boolean;
  minDate: string;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Cupones',
      link: '/setting/coupon',
      icon: 'fa fa-ravelry'
    },
    {
      title: 'Actualizar',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];

  enable = false;

  cupon = {
    _id: '',
    title: '',
    code: '',
    description: '',
    minMount: 0,
    mount: 0,
    estado: 1
  };
  couponId: any;

  constructor(
    private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public couponService: CouponService,
    private toastrService: ToastrService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.route.params.map(params => params['id']).subscribe(id => {
      this.couponId = id;
      this.couponService.getCouponDetails(id).subscribe(
        response => {
          this.cupon = response;
          console.log(this.cupon);
        },
        (error: Response) => {
          const err: any = error;
          const e = JSON.parse(err._body);
          this.toastrService.error(e.mensaje, e.codigo);
          if (e.codigo === '401') this.router.navigate(['/dashboard']);
        }
      );
    });
  }


  onUpdateCoupon(form: NgForm) {
    this.cupon.minMount = Number(this.cupon.minMount);
    this.cupon.mount = Number(this.cupon.mount);
    this.couponService.updateCoupunData(this.cupon, this.couponId).subscribe(
      res => {
        this.toastrService.success(
          'Cupón Actualizado Exitosamente!!!',
          'Cupón'
        );
        this.router.navigate(['/setting/coupon']);
      },
      (error: Response) => {
        const err: any = error;
        const e = JSON.parse(err._body);
        this.toastrService.error(e.mensaje, e.codigo);
        if (e.codigo === '401') this.router.navigate(['/dashboard']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/setting/coupon']);
  }
}
