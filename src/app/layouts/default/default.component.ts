import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared-service';

@Component({
  moduleId: module.id,
  selector: 'default-layout',
  templateUrl: 'default.component.html',
  styleUrls: ['default.component.scss'],
  providers: [ SharedService ]
})
export class DefaultLayoutComponent implements OnInit {
  pageTitle: any;
  boxed: boolean;
  compress: boolean;
  @Input() openedSidebar: boolean;

  constructor( private _sharedService: SharedService ) {
    this.openedSidebar = false;
    this.boxed = false;
    this.compress = false;

    _sharedService.changeEmitted$.subscribe(
      title => {
        this.pageTitle = title;
      }
    );
  }

  ngOnInit() { }

  getClasses() {
    return {
      'boxed': this.boxed,
      'compress-sidebar': this.compress,
      'open-sidebar': this.openedSidebar
    };
  }

  sidebarState() {
    this.openedSidebar = !this.openedSidebar;
  }
}
