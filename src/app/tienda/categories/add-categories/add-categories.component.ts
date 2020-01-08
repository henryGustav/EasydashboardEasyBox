import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Router } from '@angular/router';
import { SharedService } from '../../../layouts/shared-service';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'toastr-ng2';
import { Category, SubCategories } from 'app/interfaces/models';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  providers: [CategoriesService]
})
export class AddCategoriesComponent implements OnInit {
  pageTitle = 'Agregar Categoria';
  progress = false;
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
      title: 'Agregar Categoria',
      link: '',
      icon: 'fa fa-plus'
    }
  ];
  public categories: Category = {
    title: '',
    imageUrl: '',
    shortDescription: '',
    estado: 1,
    subCategory: [],

  };
  public imageUploaded = false;
  url: any = './assets/content/selectImg.png';
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions(this.categoriesService.cloudinarUpload)
  );
  sts = 0;

  constructor(private _sharedService: SharedService,
    public router: Router,
    private toastr: ToastrService,
    public categoriesService: CategoriesService) {

    this._sharedService.emitChange(this.pageTitle);
  }

  ngOnInit() {
  }


  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.imageUploaded = true;
        this.sts = 1;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSaveCategory(form: NgForm) {
    //this.categories.imageUrl = "https://localhost";
    this.progress = !(this.progress);
    if (this.sts == 1) {
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        this.sts = 0;
        const res: any = JSON.parse(response);
        this.categories.imageUrl = res.secure_url;
        this.categoriesService.saveCategoryData(this.categories).subscribe(res => {
          this.progress = !(this.progress);
          this.toastr.success('Categoria agregada...', 'Categoria');
          this.router.navigate(['/categories/all']);
        },
          error => {
            this.progress = !(this.progress);
            this.toastr.error(error.mensaje, error.codigo);
          });
      };
    }
    else {
      this.categoriesService.saveCategoryData(this.categories).subscribe(res => {
        this.progress = !(this.progress);
        this.toastr.success('Categoria agregada...', 'Categoria');
        this.router.navigate(['/categories/all']);
      },
        error => {
          this.progress = !(this.progress);
          this.toastr.error(error.mensaje, error.codigo);
        });
    }
  }

  cancel() {
    this.router.navigate(['/categories/all']);
  }
}
