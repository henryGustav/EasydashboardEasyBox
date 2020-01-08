import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'toastr-ng2';
import { Category } from 'app/interfaces/models';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.scss'],
  providers: [CategoriesService]
})
export class UpdateCategoriesComponent implements OnInit {
  pageTitle = 'Actualizar Categoría';
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Categorias',
      link: '/categories/all',
      icon: 'fa fa-clone'
    },
    {
      title: 'Actualizar-Categoría',
      link: '',
      icon: 'fa fa-pencil'
    }
  ];
  public categories: any = {
    title: '',
    imageUrl: '',
    shortDescription: '',
    estado: 1
  };

  categoryId: any;
  cargando = false;
  url: any = './assets/content/selectImg.png';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.categoriesService.cloudinarUpload)
  );

  constructor(private _sharedService: SharedService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public categoriesService: CategoriesService) {

    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.categoryId = id;
        this.categoriesService.getCategoryDetails(id)
          .subscribe((response) => {
            this.categories = response;
            this.url = this.categories.imageUrl;
          });
      });
  }


  readUrl(event) {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.uploader.uploadAll();
    this.cargando = true;
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.categories.imageUrl = res.secure_url;
      this.cargando = false;
    };
  }

  onUpdateCategory(form: NgForm) {
    // this.categories.imageUrl = "https://localhost";
    this.categoriesService.UpdateCategoryData(this.categories, this.categoryId)
      .subscribe(res => {
        this.toastr.success('Categoría Actualizada...', 'Categoría');
        this.router.navigate(['/categories/all']);
      },
        error => {
          this.toastr.error(error.mensaje, error.codigo);
        });
  }

  cancel() {
    this.router.navigate(['/categories/all']);
  }
}
