import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { OrderService } from '../order.service';
import { ToastrService } from 'toastr-ng2';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
  providers: [OrderService]
})
export class ViewOrderComponent implements OnInit {
  pageTitle = 'Ver Orden';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Ordenes',
      link: '/orders/all',
      icon: 'fa fa-shopping-basket'
    },
    {
      title: 'Ver',
      link: '',
      icon: 'fa fa-search'
    }
  ];

  orderId: any;

  order: any = {
    user: {
      name: '',
      email: '',
      contactNumber: '',
      address: ''
    },
    client: {
      name: '',
      email: '',
      contactNumber: '',
      address: ''
    },
    shippingDetails: {
      pincode: 560068,
      country: '',
      state: '',
      city: '',
      landmark: '',
      userName: ''
    },
    payment: {
      paymentStatus: false
    },
    deductedDiscount: 0,
    couponAmount: 0
  };

  updateStatus: any = {
    status: '',

  };


  constructor(private toastr: ToastrService, private _sharedService: SharedService, public router: Router, private route: ActivatedRoute, public orderService: OrderService) {
    this._sharedService.emitChange(this.pageTitle);
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.orderId = id;
        if (id) {
          this.getOrderData();
        }
      });
  }

  getOrderData() {
    this.orderService.getOrderDetails(this.orderId)
      .subscribe((response) => {
        this.order = response;
        this.updateStatus.status = this.order.status;
      });
  }

  onChange(event) {
    const estado = event;
    this.order.status = estado;
    this.orderService.updateOrdersData(this.order, this.orderId).subscribe((res) => {
      this.toastr.info('Se actualizado el estado de la Orden', 'Orden');
      this.getOrderData();
    }, (error) => {
      this.toastr.error('Estado no actualizado ', 'Error');
    });
  };

  onPrint() {
    try {
      this.orderService.generarOrdenPDF(this.order).subscribe(
        response => {
          const mediaType = 'application/pdf';
          const blob = new Blob([(<any>response)._body], { type: mediaType });
          const filename = 'Orden.pdf';
          saveAs(blob, filename);
        },
        error => {
          console.log(error);
          this.toastr.error(error.codigo, error.mensaje);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit() {}
}
