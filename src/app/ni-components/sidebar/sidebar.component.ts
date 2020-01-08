import { Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
  host: {'class': 'app-sidebar'}
})
export class SidebarComponent implements OnInit {
  constructor( ) { }

  ngOnInit() { }
}