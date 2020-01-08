import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'toastr-ng2';
import {Router} from '@angular/router';
import {SharedService} from '../../../../layouts/shared-service';
import {ColorService} from '../color.service';
import {ColorPickerModule, ColorPickerService} from 'ngx-color-picker';
import { ProductColors } from 'app/interfaces/models';


@Component({
    selector: 'app-add-color',
    templateUrl: './add-color.component.html',
    styleUrls: ['./add-color.component.scss'],
    providers: [ColorService]
})
export class AddColorComponent implements OnInit {
    pageTitle = 'Agregar Color';
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
            title: 'Agregar',
            link: '',
            icon: 'fa fa-plus'
        }
    ];
    colors: ProductColors = {
        title: '',
        colorCode: '',
        estado: 1
    };

//data:any
    constructor(private _sharedService: SharedService,
                public router: Router,
                public colorService: ColorService,
                private toastrService: ToastrService,
                public cpService: ColorPickerService) {

        this._sharedService.emitChange(this.pageTitle);
    }

    ngOnInit() {
    }


    onSaveColor(form: NgForm) {
        this.colorService.saveColorData(this.colors).subscribe(res => {
            this.toastrService.success('Color Agregado Correctamente!!!', 'Color');
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
