import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../layouts/shared-service';
import {ProductsService} from '../product.service';

@Component({
    selector: 'app-view-products',
    templateUrl: './view-products.component.html',
    styleUrls: ['./view-products.component.scss'],
    providers: [ProductsService]
})
export class ViewProductsComponent implements OnInit {

    breadcrumbIcon: any = [
        {
            title: 'Inicio',
            link: '/dashboard',
            icon: 'fa fa-home'
        },
        {
            title: 'Productos',
            link: '/products/all',
            icon: 'fa fa-briefcase'
        },
        {
            title: 'Ver-Productos',
            link: '',
            icon: 'fa fa-search'
        }
    ];

    public products: any = {
      _id: '',
      codigo: '',
        title: '',
        category: '',
        subCategory: '',
        shortDescription: '',
        brand: '',
        description: '',
        imageUrl: '',
        isFeatured: false,
        offerPercentage: Number,
        price: Number,
        thumbnail: []
    };

    public categoryInfo: any = {};
    public subCategoryInfo: any = {};
    public brandInfo: any = {};
    private pageTitle = 'Ver Producto';
    private productId: any;
    public productImages: any[] = [];
    public isProductImages = 0;
    public url: any = '';
    public variantsInfo: any[] = [];
    public totalVariants = 0;

    constructor(private _sharedService: SharedService, private route: ActivatedRoute, public router: Router, public productsService: ProductsService) {
        this._sharedService.emitChange(this.pageTitle);

        //Products
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.productId = id;
                if (id) {
                    this.getProductData();
                }
            });
    }

    getProductData() {
        this.productsService.getProductDetails(this.productId)
            .subscribe((response) => {
                this.products = response;
                this.url = this.products.imageUrl.url;
                this.productImages = this.products.thumbnail;
                this.categoryInfo = this.products.category;
                this.subCategoryInfo = this.products.subCategory;
                this.brandInfo = this.products.brand;
                this.isProductImages = this.productImages.length;
                this.variantsInfo = this.products.sizecolors;
                this.totalVariants = this.variantsInfo.length;
                console.log('variantsInfo ' + JSON.stringify(this.variantsInfo));
            });
    }

    viewVariant(variantId) {
        this.router.navigate(['products/variants/view', variantId]);
    }

    ngOnInit() {
    }

}
