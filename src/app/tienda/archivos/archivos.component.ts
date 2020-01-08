import { Component, OnInit } from '@angular/core';
import { ArchivoService } from 'app/tienda/archivos/archivos.service';
import { NgForm } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ConstantService } from 'app/constant.service';
import { ToastrService } from 'toastr-ng2';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss'],
  providers: [ArchivoService]
})
export class ArchivosComponent implements OnInit {
  pageTitle = 'Importar Productos';
  progress = false;
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Importar Productos',
      link: '',
      icon: 'fa fa-archive'
    }
  ];
  private fileUpload: File;
  public uploader: FileUploader = new FileUploader({allowedFileType: ['xlsx', 'xls'], url: this.constantService.API_ENDPOINT + 'upload/productos/'});

  constructor(public archivoService: ArchivoService, public constantService: ConstantService,  private toastrService: ToastrService) {
    this.uploader.onErrorItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {
      const msg: any = JSON.parse(response);
      this.toastrService.error(msg.mensaje, msg.codigo);
      });

   }

  ngOnInit() {
  }

  onUploadArchivo(f: NgForm) {
    //this.archivoService.uploadArchivo(this.fileUpload)
  }


}

