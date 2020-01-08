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
  selector: 'app-add-variant',
  templateUrl: './add-variant.component.html',
  styleUrls: ['./add-variant.component.css'],
  providers: [ProductsService, VariantService]
})
export class AddVariantComponent implements OnInit {
  idUnidad;
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
      title: 'Agregar Característica',
      link: '',
      icon: 'fa fa-vine'
    }
  ];
  public pageTitle = 'Agregar Característica';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  private productId: number;
  public colorData: any = [];
  public sizeData: any = [];
  public images: any[] = [];
  public productsVariant: any = {
    idProducto: Number,
    imageUrl: {},
    thumbnail: [],
    idSize: null,
    idColor: null,
    offerFin: null,
    offerIni: null,
    offerPercentage: Number
  };
  public url: any = './assets/content/selectImg.png';
  public imageUploaded = false;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.restService.cloudinarUpload)
  );

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
    this.idUnidad = this.route.snapshot.params['idUnidad'];
    this.route.params
      .map(params => params['idProducto'])
      .subscribe(id => {
        this.productId = id;
        this.productsVariant.idProducto = id;
      });
  }

  deleteImage(i) {
    this.images.splice(i, 1);
    this.uploader.removeFromQueue(i);
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

  onSaveVariant(ngform: NgForm) {
    if (this.uploader.progress < 100) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (
        item: any,
        response: string,
        status: number,
        headers: any
      ): any => {
        const res: any = JSON.parse(response);
        this.productsVariant.thumbnail.push({
          url: res.secure_url,
          publicId: res.public_id
        });
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
        if (this.productsVariant.thumbnail.length == this.images.length) {
          this.productsVariant.imageUrl = this.productsVariant.thumbnail[0];
          this.variantService.saveVariantData(this.productsVariant).subscribe(
            res => {
              this.toastrService.success(
                'Caracteristica agregada recientemente!!!',
                'Característica'
              );
              this.router.navigate([
                '/products/variants/all/' + this.productId + '/' + this.idUnidad
              ]);
            },
            error => {
              this.toastrService.error(error.mensaje, error.codigo);
            }
          );
        } else {
          console.log('Por favor seleccione una imagen');
        }
      };
    } else {
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
      if (this.productsVariant.thumbnail.length == this.images.length) {
        this.productsVariant.imageUrl = this.productsVariant.thumbnail[0];
        this.variantService.saveVariantData(this.productsVariant).subscribe(
          res => {
            this.toastrService.success(
              'Caracteristica agregada recientemente!!!',
              'Característica'
            );
            this.router.navigate(['/products/variants/all/' + this.productId + '/' + this.idUnidad]);
          },
          error => {
            this.toastrService.error(error.mensaje, error.codigo);
          }
        );
      } else {
        console.log('Por favor seleccione una imagen');
      }
    }
  }

  cancel() {
    this.router.navigate(['/products/variants/all/' + this.productId + '/' + this.idUnidad]);
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

  ngOnInit() {
    this.getColorData();
    this.getSizeData();
  }
}
