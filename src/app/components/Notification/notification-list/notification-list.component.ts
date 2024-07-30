import {Component, OnInit} from '@angular/core';

import {Router, RouterModule} from "@angular/router";
import { NotificationService } from '../../../services/notification-service.service';

@Component({
  selector: 'app-front-notifications',
  templateUrl: './front-notifications.component.html',
  imports:[RouterModule]
})
export class NotificationListComponent implements OnInit {
  notifications: any;
  searchTerm:string='';
  searchType:string='type';
  filteredNotifications:any[]=[];

  constructor(private notificationService: NotificationService, private router: Router) {
  }

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.notificationService.getAllByUser().subscribe((response: any) => {
      this.notifications = response;
      this.filterNotifications();
    });
    console.log(this.notifications);
  }
  filterNotifications() {
    if (!this.searchTerm) {
      this.filteredNotifications = this.notifications;
      return;
    }

    this.filteredNotifications = this.notifications.filter((notification: any) => {
      if (this.searchType === 'date') {
        // Convert both dates to MM/DD/YYYY format for comparison
        const notificationDate = new Date(notification.date).toLocaleDateString();
        const searchTermDate = new Date(this.searchTerm).toLocaleDateString();
        return notificationDate === searchTermDate;
      } else {
        return notification[this.searchType].toLowerCase().includes(this.searchTerm.toLowerCase());
      }
    });
  }

  get sortedNotifications(): any[] {
    return this.filteredNotifications.sort((a: any, b: any) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  viewNotification(notification: any) {
    this.router.navigate([`/notification/${notification.id}`]);
  }

}