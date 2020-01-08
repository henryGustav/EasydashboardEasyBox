import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { ExtraService } from './extra.service';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss'],
  providers: [ExtraService]
})
export class ExtraComponent implements OnInit {
  pageTitle = 'Cargos por envíos';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Cargos por envíos',
      link: '',
      icon: 'fa fa-ravelry'
    }
  ];
  extraData: any = [];

  constructor(private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public extraService: ExtraService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.extraService.getExtraData().subscribe(res => {
      this.extraData = res;
    },
      (error: Response) => {
        const err: any = error;
        const e = JSON.parse(err._body);
        this.toastr.error(e.mensaje, e.codigo);
        if (e.codigo === '401')
          this.router.navigate(['/dashboard']);
      });
  }

  addExtra() {
    this.router.navigate(['setting/add-extra']);
  }

  editExtra(key) {
    this.router.navigate(['setting/update-extra', key]);
  }

  onDeleteExtra(key) {

    if (confirm('Está seguro que desea eliminar este Cargo por envío?') == true) {
      this.extraService.deleteExtraData(key)
        .subscribe((response) => {
          this.toastr.info('Cargo por envío Eliminado...', 'Cargo por envío');
          this.extraService.getExtraData()
            .subscribe((response) => {
              this.extraData = response;
            });
        });
    }
  }

}
