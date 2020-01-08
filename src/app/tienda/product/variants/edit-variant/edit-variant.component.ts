import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../product.service';
import { VariantService } from '../variant.service';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { SharedService } from '../../../../layouts/shared-service';
import { ToastrService } from 'toastr-ng2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['./edit-variant.component.css'],
  providers: [ProductsService, VariantService]
})
export class EditVariantComponent implements OnInit {
  breadcrumbIcon: any = [];

  public pageTitle = 'Actualizar Característica';
  public colorData: any = [];
  public sizeData: any = [];
  public images: any[] = [];
  public imagesArrayLength: number;
  //    public imageUpdated: number = 0;
  private indexId;
  private variantId;
  private productId;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  public productsVariant: any = {
    id_: Number,
    product: '',
    stockSize: '',
    sku: '',
    price: '',
    size: '',
    color: '',
    imageUrl: {},
    thumbnail: [],
    index: '',
    offerPercentage: Number,
    offerIni: null,
    offerFin: null
  };

  //private deleteImages: any[] = [];

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.restService.cloudinarUpload)
  );
  idUnidad: any;

  constructor(
    private toastrService: ToastrService,
    public datepipe: DatePipe,
    private variantService: VariantService,
    private _sharedService: SharedService,
    private route: ActivatedRoute,
    public router: Router,
    public restService: ProductsService
  ) {
    this._sharedService.emitChange(this.pageTitle);
    this.route.params
      .map(params => params)
      .subscribe(params => {
        this.variantId = params.id;
        this.indexId = params.index;
        this.idUnidad = params.idUnidad;
        this.getVarientData();
      });
  }

  getVarientData() {
    this.variantService.getSingleVariantData(this.variantId).subscribe(res => {
      this.productsVariant = res;
      this.images = this.productsVariant.thumbnail;
      //            this.imagesArrayLength = this.images.length;
      this.productsVariant.index = this.indexId;
      this.productId = this.productsVariant.idProducto;
      const digitpattern = /\d+/g;
      if (
        this.productsVariant.offerIni &&
        this.productsVariant.offerIni != null
      ) {
        const matches = this.productsVariant.offerIni.match(digitpattern);
        this.fechaInicio = new Date(
          +matches[2],
          +matches[1] - 1,
          +matches[0],
          +matches[3],
          +matches[4],
          0
        );
      }
      if (
        this.productsVariant.offerFin &&
        this.productsVariant.offerFin != null
      ) {
        const matches = this.productsVariant.offerFin.match(digitpattern);
        this.fechaFin = new Date(
          +matches[2],
          +matches[1] - 1,
          +matches[0],
          +matches[3],
          +matches[4],
          0
        );
      }
      this.breadcrumbIcon = [
        {
          title: 'Inicio',
          link: '/dashboard',
          icon: 'fa fa-home'
        },
        {
          title: 'Características',
          link: '/products/variants/all/' + this.productsVariant.idProducto + '/' + this.idUnidad,
          icon: 'fa fa-briefcase'
        },
        {
          title: 'Actualizar característica',
          link: '',
          icon: 'fa fa-vine'
        }
      ];
    });
  }

  existeImagenesNuevas(): Boolean {
    const imgNuevas = this.images.filter(item => {
      return item.local;
    });
    if (imgNuevas.length && imgNuevas.length > 0) {
      return true;
    }
    return false;
  }

  onUpdateVariant(ngForm: NgForm) {
    if (this.existeImagenesNuevas()) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (
        item: any,
        response: string,
        status: number,
        headers: any
      ): any => {
        const res: any = JSON.parse(response);
        this.images.push({ url: res.secure_url, publicId: res.public_id });
        //let updatedLength = (this.imagesArrayLength - 1);
        this.updateVarientData();
        /*
        console.log(this.images);
        if (this.images[updatedLength].publicId) {//this.images[this.imagesArrayLength].publicId
            if (this.productsVariant.flag == 1) {
                this.productsVariant.deletePublicId = this.deleteImages;
                this.updateVarientData();
            }
            else {
                this.productsVariant.flag = 0;
                this.updateVarientData();
            }
        }
        else {
            console.log('Esperando imagen');
        }*/
      }; // uploader close
    } else {
      //if (this.productsVariant.flag == 1) {
      //    this.productsVariant.deletePublicId = this.deleteImages;
      this.updateVarientData();
    }
    /*
                else {
                    this.productsVariant.flag = 0;
                    this.updateVarientData();
                }
            }//else close */
  } //onUpdateVariant close

  updateVarientData() {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].local) {
        this.images.splice(i, 1);
      }
    }
    this.productsVariant.imageUrl = this.images[0];
    this.productsVariant.thumbnail = this.images;
    if (
      this.productsVariant.offerPercentage &&
      this.productsVariant.offerPercentage > 0
    ) {
      this.productsVariant.offerIni = this.datepipe.transform(
        this.fechaInicio,
        'dd/MM/yyyy HH:mm:ss'
      );
      this.productsVariant.offerFin = this.datepipe.transform(
        this.fechaFin,
        'dd/MM/yyyy HH:mm:ss'
      );
    }
    this.variantService
      .updateVariantData(this.productsVariant, this.variantId)
      .subscribe(
        res => {
          this.toastrService.success(
            'Característica Actualizada ',
            'Característica'
          );
          this.router.navigate([
            '/products/variants/all/' + this.productId + '/' + this.idUnidad
          ]);
        },
        error => {
          this.toastrService.error(error.descripcion, 'Error');
        }
      );
  }

  deleteImage(i) {
    if (this.images[i].local) {
      const removeElement: any = i - this.imagesArrayLength; // removeElement store the index of uploder Queue
      this.images.splice(i, 1);
      this.uploader.removeFromQueue(removeElement);
    } else {
      const publicId = this.images[i].publicId;
      //this.deleteImages.push(publicId);
      this.images.splice(i, 1);
      this.imagesArrayLength = this.images.length;
      //this.productsVariant.flag = 1;
    }
  }

  getColorData() {
    this.restService.getColorData().subscribe(res => {
      this.colorData = res;
    });
  }

  getSizeData() {
    this.restService.getSizeDataByUnidad(this.idUnidad).subscribe(res => {
      this.sizeData = res;
    });
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.images.push({ url: event.target.result, local: true });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  cancel() {
    this.router.navigate(['/products/variants/all/' + this.productId + '/' + this.idUnidad]);
  }

  ngOnInit() {
    this.getColorData();
    this.getSizeData();
  }
}
