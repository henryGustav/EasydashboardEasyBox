import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {ColorService} from './color.service';
import {ToastrService} from 'toastr-ng2';
import { ProductColors } from 'app/interfaces/models';

@Component({
    selector: 'app-color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss'],
    providers: [ColorService]
})
export class ColorComponent implements OnInit {
    pageTitle = 'Colors';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Color',
            link: '',
            icon: 'fa fa-ravelry'
        }
    ];
    colorData: ProductColors[] = [];

    constructor(private _sharedService: SharedService,
                public router: Router,
                public colorService: ColorService,
                private toastr: ToastrService) {
        this._sharedService.emitChange(this.pageTitle);

    }

    ngOnInit() {
        this.colorService.getColorAllData().subscribe(res => {
            this.colorData = res;
        },
        (error: Response) => {
          const err: any = error;
          const e = JSON.parse(err._body);
          this.toastr.error(e.mensaje, e.codigo);
          if (e.codigo === '401')
            this.router.navigate(['/dashboard']);
        });
    }

    addColor() {
        this.router.navigate(['options/add-color']);
    }

    editColor(key) {
        this.router.navigate(['options/update-color', key]);
    }

    onInactive(key) {
      if (confirm('Estaá seguro que desea eliminar este color!') == true) {
          this.colorService.deleteColorData(key._id)
              .subscribe((response) => {
                  this.toastr.info('Color eliminado...', 'Color');
                  this.colorService.getColorAllData()
                      .subscribe((response) => {
                          this.colorData = response;
                      });
              });
      }
  }

  onActive(key) {
    if (confirm('Estaá seguro que desea activar este color!') == true) {
        this.colorService.activeColorData(key._id)
            .subscribe((response) => {
                this.toastr.info('Color activado...', 'Color');
                this.colorService.getColorAllData()
                    .subscribe((response) => {
                        this.colorData = response;
                    });
            });
    }
}
}
