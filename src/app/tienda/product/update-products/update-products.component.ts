import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { SharedService } from '../../../layouts/shared-service';
import { ProductsService } from '../product.service';
import { ToastrService } from 'toastr-ng2';
import { CKEditorModule } from 'ng2-ckeditor';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss'],
  providers: [ProductsService]
})
export class UpdateProductsComponent implements OnInit {

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
      title: 'Actualizar-Producto',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];

  brandData: any = [];
  categoryData: any = [];
  subCategoryData: any = [];
  tiendas: any = [];
  public images: any[] = [];
  public imagesArrayLength: number;
  //0 no actualizado la imagen
  //1 imagen agregada

  productId: any;
  public disabled = false;
  public products: any = {
    _id: null,
    codigo: '',
    title: '',
    categoryId: '',
    subCategoryId: '',
    brandId: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    isFeatured: false,
    price: Number,
    thumbnail: [], flag: 0,
    estado: 1
  };

  //    private deleteImages: any[] = [];
  //    private deleteIndex: any[] = [];
  pageTitle = 'Actualizar Producto';
  url: any = './assets/content/file-1.jpg';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.productsService.cloudinarUpload)
  );

  constructor(private toastr: ToastrService, private _sharedService: SharedService, private route: ActivatedRoute, public router: Router, public productsService: ProductsService) {

    this._sharedService.emitChange(this.pageTitle);
    //Category
    this.getCategoryData();
    //Products
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.productId = id;
        this.getSavedProductData(id);
      });
    // Brand
    this.getBrandData();
    this.getTiendaData();
  }

  ngOnInit() { }

  getTiendaData() {
    this.productsService.getTiendaData().subscribe(
      res => {
        this.tiendas = res;
      },
      error => {
        this.toastr.error(error.mensaje, this.pageTitle);
      }
    );
  }

  getSavedProductData(id) {  //get saved product Data
    this.productsService.getProductDetails(id)
      .subscribe((response) => {
        this.products = response;

        this.images = this.products.thumbnail;
        this.imagesArrayLength = this.images.length;
        //console.log("update product "+JSON.stringify(this.products));
        this.categoryData.forEach(element => {
          if (element._id === this.products.categoryId) {
            this.subCategoryData = element.subCategory;
          }
        });
      }
      );
  }

  getCategoryData() { // get Category Data
    this.productsService.getCategoryAllData().subscribe(res => {
      this.categoryData = res;
    });
  }

  getBrandData() { // get Brand data
    this.productsService.getBrandData().subscribe(res => {
      this.brandData = res;
    });
  }

  //Image View
  readUrl(event) {
    console.log('leer ruta');
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push({ url: event.target.result, local: true });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteImage(i) {  // delete Image
    if (this.images[i].local) {
      const removeElement: any = (i - this.imagesArrayLength); // removeElement store the index of uploder Queue
      this.images.splice(i, 1);
      this.uploader.removeFromQueue(removeElement);

    }
    else {
      //console.log("Delete from server result");
      const publicId = this.images[i].publicId;
      //            this.deleteImages.push(publicId);
      //            this.deleteIndex.push(i);
      this.images.splice(i, 1);
      this.imagesArrayLength = this.images.length;
      //this.products.flag = 1;
    }
  }


  existeImagenesNuevas(): Boolean {
    const imgNuevas = this.images.filter((item) => {
      return item.local;
    });
    if (imgNuevas.length && imgNuevas.length > 0) {
      return true;
    }
    return false;
  }


  //Sub-Category
  onChange(event) {
    const index = this.categoryData.map((o) => o._id).indexOf(event);
    if (index >= 0) {
      this.subCategoryData = this.categoryData[index].subCategory;
    }
  }


  OnUpdateProduct(form: NgForm) {
    const marca = this.brandData.filter(
      brand => brand._id === this.products.brandId);

    if (marca.length === 0) {
      this.toastr.warning('La Marca del producto, ha sido eliminada seleccione otra.', 'Warning');
      return;
    }
    if (this.images === undefined || this.images.length === 0) {
      this.toastr.warning('Se requiere al menos una imagen', 'Warning');
      return;
    }
    if (this.existeImagenesNuevas()) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        const res: any = JSON.parse(response);
        this.images.push({ url: res.secure_url, publicId: res.public_id });
        //let updatedLength = (this.imagesArrayLength - 1);
        this.updateProductData();
        /*
        console.log(updatedLength);
        if (this.images[updatedLength].publicId) {//this.images[this.imagesArrayLength].publicId
            if (this.products.flag == 1) {
                this.products.deletePublicId = this.deleteImages;
                this.products.deleteIndex = this.deleteIndex;
                this.updateProductData();
            }
            else {
                this.products.flag = 0;
                this.updateProductData();
            }
        }
        else {
            //console.log("Wait for Image");
        }*/
      };
      // uploader close

    }
    else {
      // if (this.products.flag == 1) {
      //     this.products.deletePublicId = this.deleteImages;
      //     this.products.deleteIndex = this.deleteIndex;
      this.updateProductData();
    }
    /*
        else {
            this.products.flag = 0;
            this.updateProductData();
        }
    }*/
    //else close
  }



  updateProductData() {
    console.log(this.images);
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].local) {
        this.images.splice(i, 1);
      }
    }
    this.products.imageUrl = this.images[0];
    this.products.thumbnail = this.images;
    this.productsService.UpdateProductData(this.products, this.productId).subscribe((res) => {
      this.toastr.success('Producto Actualizado ', 'Producto');
      this.router.navigate(['/products/all/']);
    }, (error) => {
      this.toastr.error(error.descripcion, 'Error');

    });
  }

  cancel() {
    this.router.navigate(['/products/all']);
  }
}
