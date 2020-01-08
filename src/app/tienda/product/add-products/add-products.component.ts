import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { SharedService } from '../../../layouts/shared-service';
import { ProductsService } from '../product.service';
import { ToastrService } from 'toastr-ng2';
import { CKEditorModule } from 'ng2-ckeditor';
import { Product } from 'app/interfaces/models';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  providers: [ProductsService]
})
export class AddProductsComponent implements OnInit {
  public images: any[] = [];
  categoryData: any = [];
  unitData: any = [];
  subCategoryData: any = [];
  brandData: any = [];
  colorData: any = [];
  sizeData: any = [];
  tiendas: any = [];

  checkedGroceries: any = [];

  public products: Product = {
    idTienda: null,
    title: '',
    categoryId: null,
    subCategoryId: null,
    brandId: null,
    shortDescription: '',
    description: '',
    imageUrl: '',
    stockSize: null,
    isFeatured: false,
    price: null,
    sale: false,
    color: null,
    size: null,
    new: false,
    active: true,
    thumbnail: [],
    estado: 1,
    unityId: null
  };

  selectedSize: any = [];

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
      title: 'Agregar Productos',
      link: '',
      icon: 'fa fa-plus'
    }
  ];

  pageTitle = 'Nuevo Producto';
  url: any = './assets/content/selectImg.png';
  public imageUploaded = false;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.productsService.cloudinarUpload)
  );

  constructor(
    private toastrService: ToastrService,
    private _sharedService: SharedService,
    public router: Router,
    public productsService: ProductsService
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.products.description = `<p>Agregar descripcion del producto aqui </p>`;
    this.products.idTienda = 1;
  }

  ngOnInit() {
    //Category Data
    this.productsService.getCategoryData().subscribe(res => {
      this.categoryData = res;
    });

    // Unity Data
    this.productsService.getUnitMeasurement().subscribe(res => {
      this.unitData = res;
    });

    // Brand Data
    this.productsService.getBrandData().subscribe(res => {
      this.brandData = res;
    });

    // Color Data
    this.productsService.getColorData().subscribe(res => {
      this.colorData = res;
    });


    this.getTiendaData();
  }

  getTiendaData() {
    this.productsService.getTiendaData().subscribe(
      res => {
        this.tiendas = res;
      },
      error => {
        this.toastrService.error(error.mensaje, this.pageTitle);
      }
    );
  }

  // Sub-Category Data
  onChange(event) {
    this.productsService.getSubCategoryData(event).subscribe(res => {
      this.subCategoryData = res;
    });
  }


  onChangeUnidad(event) {
   // Size
   this.productsService.getSizeDataByUnidad(event).subscribe(res => {
    this.sizeData = res;
  });
  }
  // delete Image
  deleteImage(i) {
    this.images.splice(i, 1);
    this.uploader.removeFromQueue(i);
  }

  //Save Product
  onSaveProduct(form: NgForm) {
    console.log('entro');
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (
      item: any,
      response: string,
      status: number,
      headers: any
    ): any => {
      const res: any = JSON.parse(response);
      this.products.thumbnail.push({
        url: res.secure_url,
        publicId: res.public_id
      });
      if (this.products.thumbnail.length == this.images.length) {
        this.products.imageUrl = this.products.thumbnail[0];
        this.products.thumbnail = this.products.thumbnail;
        //this.products.size = this.selectedSize;
        this.productsService.saveProductData(this.products).subscribe(
          res => {
            this.toastrService.success(
              'Product Added Successfully!!!',
              'Product'
            );
            this.router.navigate(['/products/all']);
          },
          error => {
            console.log(error);
            this.toastrService.error(error.descripcion, error.codigo);
          }
        );
      } else {
        console.log('Please Select Image');
      }
    };
  }

  checkedVal(value, index) {
    this.selectedSize.push(this.sizeData[index].sizeShortName);
  }

  cancel() {
    this.router.navigate(['/products/all']);
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push(event.target.result);
        this.imageUploaded = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
