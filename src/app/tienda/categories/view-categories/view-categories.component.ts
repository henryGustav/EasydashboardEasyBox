import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {CategoriesService} from '../categories.service';

@Component({
    selector: 'app-view-categories',
    templateUrl: './view-categories.component.html',
    styleUrls: ['./view-categories.component.scss'],
    providers: [CategoriesService]
})
export class ViewCategoriesComponent implements OnInit {
    pageTitle = 'Ver Categoría';
    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Categorías',
            link: '/categories/all',
            icon: 'fa fa-clone'
        },
        {
            title: 'Ver-Categoría',
            link: '',
            icon: 'fa fa-search'
        }
    ];
    categoryId: any;
    categories: any = {};
    subCategories: any = [];
    url: any;

    constructor(private _sharedService: SharedService,
                public router: Router,
                private route: ActivatedRoute,
                public categoriesService: CategoriesService) {
        this._sharedService.emitChange(this.pageTitle);
        this.route.params.map(params => params['id'])
            .subscribe(id => {
                this.categoryId = id;
                this.getData(id);
            });
    }

    getData(id) {
        this.categoriesService.getCategoryDetails(id)
            .subscribe((response) => {
                this.categories = response;
                console.log(response);
                this.url = this.categories.imageUrl;
            });
        this.categoriesService.getSubCategoryData(id)
            .subscribe(response => {
                this.subCategories = response;
            });
    }

    ngOnInit() {
    }

}

//categories/category/allData/
