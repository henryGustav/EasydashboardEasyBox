import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DemoService } from './demo.service';
import { Subject } from 'rxjs/Subject';
import { DataTable } from 'angular2-datatable';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [],
  providers: [DemoService, DataTable]
})
export class DemoComponent implements OnInit, AfterViewInit {

  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'DEMO',
      link: '',
      icon: 'fa fa-certificate'
    }
  ];

  constructor(private demoService: DemoService) { }
  loading = false;
  codPlanificacion = '';
  tareasData: any = [];
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  //dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();


  displayToConsole(datatableElement: DataTableDirective): void {
    datatableElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
  }

  cargarTareas(form: NgForm) {
    this.loading = true;
    this.demoService.getSubCategoryData(this.codPlanificacion).subscribe(res => {
      this.tareasData = res.json();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
        this.loading = false;
      });
    });


  }

  ngOnChanges() {
    console.log('ngOnChanges');
  }

  ngOnInit(): void {
    this.dtOptions = {
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
        'csvHtml5',
        'pdfHtml5'
      ],
      pagingType: 'full_numbers',
      pageLength: 50,
    };
  }
  /*
  ngDoCheck() {
    console.log('ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.dtTrigger.next();
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }*/


  exportarData() {
    console.log('entro');
  //  new Angular2Csv(this.tareasData, 'My Report');

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
