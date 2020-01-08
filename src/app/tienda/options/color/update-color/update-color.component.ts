import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../../layouts/shared-service';
import { ColorService } from '../color.service';
import { ToastrService } from 'toastr-ng2';
import { ProductColors } from 'app/interfaces/models';
import { ColorPickerModule, ColorPickerService } from 'ngx-color-picker';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.scss'],
  providers: [ColorService]
})
export class UpdateColorComponent implements OnInit {
  pageTitle = 'Actualizar Color';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Color',
      link: '/options/color',
      icon: 'fa fa-ravelry'
    },
    {
      title: 'Actualizar',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];
  colors: ProductColors = {
    title: '',
    colorCode: '',
    estado: 1
  };
  colorId: any;

  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    public colorService: ColorService,
    private toastrService: ToastrService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.colorId = id;
        this.colorService.getColorDetails(id)
          .subscribe((response) => {
            this.colors = response;
            if (this.colors && !this.colors.colorCode) {
              this.colors.colorCode = '';
            }

          }
          );
      });
  }

  onUpdateColor(form: NgForm) {
    this.colorService.UpdateColorData(this.colors, this.colorId).subscribe(res => {
      this.toastrService.success('Color Actualizado correctamente!!!', 'Color');
      this.router.navigate(['/options/color']);
    }, error => {
      const e = error.json();
      this.toastrService.error(e.mensaje, e.codigo);
    });
  }

  cancel() {
    this.router.navigate(['/options/color']);
  }
}
