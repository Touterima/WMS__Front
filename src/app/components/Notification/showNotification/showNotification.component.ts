import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, RouterModule} from "@angular/router";
import { NotificationService } from '../../../services/notification-service.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  imports:[RouterModule]

})
export class NotificationDetailsComponent implements OnInit{
  id?:String;
  notification:any;
  constructor(private notificationService:NotificationService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.notificationService.getNotification(this.id).subscribe((notification:any)=>{
      this.notification=notification;
      console.log(notification);
    });
  }
}