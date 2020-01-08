import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs/observable/empty';
import { isEmpty } from 'rxjs/operator/isEmpty';

@Component({
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService] //SocketSharedService
})
export class PageDashboardComponent implements OnInit {
  pageTitle = 'Panel de Control';
  errorImg = false;
  errorImage = './assets/content/error.png';
  loading= 0;
  arrayLength: number;
  url: any = './assets/content/nodata_cloud.png';

  public staticsCounts: any = {
    ordercount: 0,
    productcount: 0,
    categorycount: 0,
    revenue: 0
  };
  lat= 50.4664212;
  lng= 30.6;

  loadingIndicator = true;

  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgb(0, 102, 255)',
      borderColor: 'rgb(0, 0, 0)'
    },
    { // dark grey
      backgroundColor: 'rgb(255, 255, 0)',
      borderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgb(0, 255, 0)',
      borderColor: 'rgba(148,159,177,1)'
    },
    { // grey
      backgroundColor: 'rgb(255, 0, 0)',
      borderColor: 'rgba(148,159,177,1)'
    }
  ];

  public pieChartColors: Array<any> = [ {backgroundColor: [
 'rgb(0, 102, 255)', 'rgb(255, 255, 0)', 'rgb(99, 183, 108)', 'rgb(255, 0, 0)']}];

  constructor(
    public router: Router,
    private restService: DashboardService,
    private _sharedService: SharedService
  ) {
    //, private socketService: SocketSharedService
    this._sharedService.emitChange(this.pageTitle);
    const myId = localStorage.getItem('id');
    if (myId != '') {
      this.getStaticsData();
      this.getGraphData();
      this.getTenOrders();
    }
  }

  getStaticsData() {
    this.restService.getSalesData().subscribe(res => {
      this.staticsCounts = res;
    });
  }

  viewOrder(key) {
    this.router.navigate(['orders/view', key]);
  }

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    responsiveAnimationDuration: 500
  };

  public barChartLabels: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public pieChartLabels: string[] = [
    'Pendientes',
    'Despachadas',
    'Entregadas',
    'Canceladas'
  ];
  public pieChartData: number[] = [0, 0, 0, 0];
  public pieChartType = 'pie';

  public barChartData: any[] = [
    { data: [0], label: 'Ordenes Pendientes' },
    { data: [0], label: 'Ordenes Despachadas' },
    { data: [0], label: 'Ordenes Entregadas' },
    { data: [0], label: 'Ordenes Canceladas' }
  ];

  public serverChartData: any = [];
  public recentOrders: any[] = [];

  getGraphData() {
    this.loading = 0;
    this.restService.getGraphBarData().subscribe(
      res => {
        if (!(Object.keys(res).length == 0)) {
          this.serverChartData = res;
          this.barChartLabels = this.serverChartData.labels;

          this.barChartData[0].data = this.serverChartData.data1;
          this.barChartData[1].data = this.serverChartData.data2;
          this.barChartData[2].data = this.serverChartData.data3;
          this.barChartData[3].data = this.serverChartData.data4;

          this.arrayLength = this.serverChartData.length;
        }
        this.loading = 1;
      },
      error => {
        this.loading = 2;
      }
    );

    this.loading = 0;
    this.restService.getGraphPieData().subscribe(
      res => {
        if (!(Object.keys(res).length == 0)) {
        this.serverChartData = res;
        this.pieChartLabels = [
          'Pendientes',
          'Despachadas',
          'Entregadas',
          'Canceladas'
        ];

        this.pieChartData = [];
        this.pieChartData = this.serverChartData.data1;
      }
        this.loading = 1;
      },
      error => {
        this.loading = 2;
      }
    );
  }

  ngOnInit() {}

  getTenOrders() {
    this.restService.getRecentOrders().subscribe(res => {
      this.recentOrders = res;
    });
  }
}
