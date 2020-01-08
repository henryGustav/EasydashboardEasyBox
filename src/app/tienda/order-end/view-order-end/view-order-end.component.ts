import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { OrderEndService } from '../order-end.service';
import { ToastrService } from 'toastr-ng2';
import { OrderService } from 'app/tienda/order/order.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-order',
  templateUrl: './view-order-end.component.html',
  styleUrls: ['./view-order-end.component.scss'],
  providers: [OrderEndService, OrderService]
})
export class ViewOrderEndComponent implements OnInit {
  pageTitle = 'Ver Orden';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Ordenes',
      link: '/orders/all-end',
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
    }
  };

  updateStatus: any = {
    status: ''
  };
  constructor(
    private toastr: ToastrService,
    private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public orderService: OrderEndService,
    public service: OrderService
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.orderId = id;
        if (id) {
          this.getOrderData();
        }
      });
  }

  getOrderData() {
    this.orderService.getOrderDetails(this.orderId).subscribe(response => {
      this.order = response;
      this.updateStatus.status = this.order.status;
    });
  }

  onPrint() {
    try {
      this.service.generarOrdenPDF(this.order).subscribe(
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
