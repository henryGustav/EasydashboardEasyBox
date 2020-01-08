import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { TaxService } from './tax.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  providers: [TaxService]
})
export class TaxComponent implements OnInit {
  pageTitle = 'Taxs';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Impuestos',
      link: '',
      icon: 'fa fa-ravelry'
    }
  ];
  taxData: any = [];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public taxService: TaxService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.taxService.getTaxData().subscribe(res => {
      this.taxData = res;
    },
      (error: Response) => {
        const err: any = error;
        const e = JSON.parse(err._body);
        this.toastr.error(e.mensaje, e.codigo);
        if (e.codigo === '401')
          this.router.navigate(['/dashboard']);
      });
  }

  addTax() {
    this.router.navigate(['setting/add-tax']);
  }

  editTax(key) {
    this.router.navigate(['setting/update-tax', key]);
  }

  onDeleteTax(key) {

    if (confirm('Está seguro que desea eliminar este impuesto?') == true) {
      this.taxService.deleteTaxData(key)
        .subscribe((response) => {
          this.toastr.info('impuesto Eliminada...', 'Impuesto');
          this.taxService.getTaxData()
            .subscribe((response) => {
              this.taxData = response;
            });
        });
    }
  }

}
