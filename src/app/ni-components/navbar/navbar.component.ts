import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocketSharedService } from '../../SocketShare.service';
import { NavBarService } from './navbar.service';
@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  providers: [NavBarService],
  host: {
    '[class.app-navbar]': 'true',
    '[class.show-overlay]': 'showOverlay'
  }
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Input() openedSidebar: boolean;
  @Output() sidebarState = new EventEmitter();
  showOverlay: boolean;
  orderNotify: any = [];
  unread: any = 0;
  constructor(private router: Router, private sockectService: SocketSharedService, private restService: NavBarService) {
    this.openedSidebar = false;
    this.showOverlay = false;
    this.getUnreadNotifications();
  }

  getUnreadNotifications() {
    this.restService.getUnreadNotificationData().subscribe((res) => {
      this.orderNotify = res;
      if (this.orderNotify) {
        const length = this.orderNotify.length;
        for (let i = 0; i < length; i++) {
          if (this.orderNotify.readNotification === false) {
            this.unread++;
          }
        }
      }
    });
  }

  open(event) {
    const clickedComponent = event.target.closest('.nav-item');
    const items = clickedComponent.parentElement.children;

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }
    clickedComponent.classList.add('opened');

    //Add class 'show-overlay'
    this.showOverlay = true;
  }

  close(event) {
    const clickedComponent = event.target;
    const items = clickedComponent.parentElement.children;

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('opened');
    }

    //Remove class 'show-overlay'
    this.showOverlay = false;
  }

  openSidebar() {
    this.openedSidebar = !this.openedSidebar;
    this.sidebarState.emit();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/pages/sign-in']);
  }

  readNavigate(notificationId, orderId) {
    console.log('readNavigate ' + notificationId + 'OrderId' + orderId);
    this.updateNotificationAndRoute(notificationId, orderId);
  }

  readNotNavigate(notificationId) {
    console.log('readNotNavigate ' + notificationId);
    this.updateNotification(notificationId);
  }

  readAllNotification() {
    this.orderNotify = [];
    this.router.navigate(['other/notifications']);
  }

  updateNotification(notificationId) {
    const notify: any = {
      readNotification: true
    };
    console.log('notificationId ' + notificationId);
    this.restService.UpdateNotificationData(notify, notificationId).subscribe((res) => {
      this.getUnreadNotifications();
    });
  }

  updateNotificationAndRoute(notificationId, orderId) {
    const notify: any = {
      readNotification: true
    };
    console.log('notificationId ' + notificationId);
    this.restService.UpdateNotificationData(notify, notificationId).subscribe((res) => {
      this.getUnreadNotifications();
      this.router.navigate(['orders/view', orderId]);

    });
  }
  ngOnInit() {
    this.sockectService.getOrderNotification().subscribe((notification) => {
      console.log(' get Order Notification' + JSON.stringify(notification));
      this.unread++;
      const data: any = notification;
      if (this.orderNotify.length == 0) {

        this.orderNotify.unshift(data);
      } else {

        const index = this.orderNotify.findIndex(x => x._id == data._id);
        if (index >= 0) {


          this.orderNotify.splice(index, 1);
          this.orderNotify.unshift(data);
        }
        else {

          this.orderNotify.unshift(data);

        }
      }
    });
  }
}
