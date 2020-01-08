import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategories } from 'app/interfaces/models';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
  providers: [SubCategoriesService]
})
export class SubCategoriesComponent implements OnInit {

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
      title: 'Sub-Categoría',
      link: '',
      icon: 'fa fa-certificate'
    }
  ];

  public pageTitle = 'Sub Categorías';
  public subCategoryData: any = [];
  public subCategoryLength: number;
  public categoryId: any;
  public showUpdate = false;
  public addSubCategoryData: SubCategories = {
    title: '',
    categoryId: '',
    codigo: '',
    estado: 1
  };

  public updateSubCategoryData: SubCategories = {
    _id: null,
    title: '',
    codigo: '',
    categoryId: null,
    estado: 1
  };

  constructor(public router: Router, private route: ActivatedRoute,
    private _sharedService: SharedService,
    private toastrService: ToastrService,
    public componentService: SubCategoriesService) {
    this._sharedService.emitChange(this.pageTitle);
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.categoryId = id;
        this.getSubcategoeyData();
      });

  }

  getSubcategoeyData() {
    this.componentService.getSubCategoryData(this.categoryId).subscribe(res => {
      this.subCategoryData = res;
      this.subCategoryLength = this.subCategoryData.length;
    });
  }

  clearAddData() {
    this.addSubCategoryData.categoryId = '';
    this.addSubCategoryData.title = '';
    this.addSubCategoryData.codigo = '';
  }

  onAddSubCategory(ngform: NgForm) {
    this.addSubCategoryData.categoryId = this.categoryId;
    this.componentService.saveSubCategoryData(this.addSubCategoryData).subscribe(res => {
      this.toastrService.info('SubCategoria guardada exitosamente.', 'SubCategoria');
      this.addSubCategoryData.title = '';
      this.addSubCategoryData.codigo = '';
      if (this.subCategoryLength < 0) {
        this.getSubcategoeyData();
      }
      else {
        this.subCategoryData.push(res);
      }
    }, error => {
      this.toastrService.error(error.mensaje, error.codigo);
    });
  }

  update(item) {
    this.showUpdate = true;
    this.updateSubCategoryData.title = item.title;
    this.updateSubCategoryData.categoryId = item.categoryId;
    this.updateSubCategoryData._id = item._id;
    this.updateSubCategoryData.codigo = item.codigo;
    this.updateSubCategoryData.estado = 1;
  }

  onUpdateSubCategory(ngform: NgForm) {
    this.updateSubCategoryData.estado = 1;
    this.componentService.UpdateSubCategoryData(this.updateSubCategoryData, this.updateSubCategoryData._id).subscribe(res => {
      this.getSubcategoeyData();
      this.closeUpdate();
    });
  }

  closeUpdate() {
    this.showUpdate = false;
    this.updateSubCategoryData.title = '';
    this.updateSubCategoryData.codigo = '';
    this.updateSubCategoryData.categoryId = '';
    this.updateSubCategoryData._id = null;
  }

  openAdd() {
    this.closeUpdate();
  }

  ngOnInit() {
  }

  onDelete(key) {
    if (confirm('Desea eliminar la subcategoría?') == true) {
      this.componentService.deleteSubCategoryData(key)
        .subscribe((response) => {
          this.getSubcategoeyData();
        });
    }
  }

}

