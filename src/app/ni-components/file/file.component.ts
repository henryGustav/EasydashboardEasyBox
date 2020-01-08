import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'file',
  templateUrl: 'file.component.html',
  styleUrls: ['file.component.scss']
})
export class FileComponent {
  @Input() title = 'no-name';
  @Input() type = '*';
  @Input() image = '';
  @Input() size = 'normal';
  @Input() delete = false;
  @Input() spinner = false;
  @Input() link: any = false;
}