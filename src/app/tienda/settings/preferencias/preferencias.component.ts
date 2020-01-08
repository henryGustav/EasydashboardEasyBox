import { Component, OnInit } from '@angular/core';
import { PreferenciasService } from './preferencias.service';
import { ToastrService } from 'toastr-ng2';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { CompatibilityModule } from '@angular/material';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css'],
  providers: [PreferenciasService]
})
export class PreferenciasComponent implements OnInit {

  constructor(
    public preferenciasService: PreferenciasService,
    private toaster: ToastrService,
    public router: Router,

  ) { }
  breadcrumbIcon: any = [
    {
      title: 'Inicio',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      title: 'Preferencias',
      link: '',
      icon: 'fa fa-clone'
    },

  ];
  preferencias: any[];
  preferenciasMovil: any[];


  ngOnInit() {
    this.preferenciasService.getPreferencias().subscribe(res => {
      this.preferencias = res;
    });

    this.preferenciasService.getPreferenciasMovil().subscribe(res => {
      this.preferenciasMovil = res;
    });
    document.getElementById("defaultOpen").click();

  }

  editPreference(id: string, valorTexto: string, forma: NgForm) {
    console.log(forma);

    if (
      confirm("Si desea editar el valor del campo, presione el bóton Aceptar!") == true
    ) {
      this.preferenciasService.editarPreferencia(id, valorTexto).subscribe(res => {
        this.toaster.success('Se ha modificado la información', 'Easy Box');
      }), (error) => {
        this.toaster.error('', 'Ha ocurrido un error')
      };
    }
  }





  openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


}
