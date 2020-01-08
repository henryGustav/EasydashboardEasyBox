import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../layouts/shared-service';
import {CategoriesService} from './categories.service';
import {ToastrService} from 'toastr-ng2';
import { Category } from 'app/interfaces/models';

//import { CrudService } from '../services/crud.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {

    errorImg = false;
    errorImage = './assets/content/error.png';

    url: any = './assets/content/nodata_cloud.png';
    pageTitle = 'Categorias';
    loading = false;
    arrayLength: number;
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Categorías',
            link: '',
            icon: 'fa fa-clone'
        }
    ];

    categoryData: any = [];

    constructor(private toastr: ToastrService,
                private _sharedService: SharedService,
                public router: Router,
                public categoriesService: CategoriesService) {//private crud: CrudService,

        this._sharedService.emitChange(this.pageTitle);
        this.getCategoryData();
    }


    ngOnInit() {
    }

    getCategoryData() {
        this.loading = !(this.loading);
        //this.crud.get('categories').subscribe(data => { this.categoryData = data; });
        this.categoriesService.getCategoryData().subscribe(res => {
            this.categoryData = res;
            this.arrayLength = this.categoryData.length;
            this.loading = !(this.loading);
        }, (error) => {
            this.loading = !(this.loading);
            this.errorImg = true;
        });
    }

    addCategory() {
        this.router.navigate(['categories/add']);
    }

    onInactiveCategory(key) {
        if (confirm('Desea inactivar la categoría?') == true) {
            this.categoriesService.inactiveCategoryData(key._id)
                .subscribe((response) => {
                    this.toastr.info('Categoría Inactiva...', 'Categoría');
                    key.estado = 0;
                }
                , error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
        }
    }

    onActiveCategory(key) {
      if (confirm('Desea activar la categoría?') == true) {
          this.categoriesService.activeCategoryData(key._id)
              .subscribe((response) => {
                  this.toastr.info('Categoría Activada...', 'Categoría');
                  key.estado = 1;
              }, error => {
                  this.toastr.error(error.descripcion, error.codigo);
              });
      }
  }

    onViewCategory(key) {
        this.router.navigate(['categories/view', key]);
    }

    onEditCategory(key) {
        this.router.navigate(['categories/update', key]);
    }

    onSubCategory(key) {
        this.router.navigate(['categories/sub-categories', key]);
    }

}
