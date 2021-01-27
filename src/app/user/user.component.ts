import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  notifications
  notificationsAmount

  constructor(private notificationServe:NotificationService) { }

  ngOnInit(): void {
    
    this.notificationServe.getNotifications().subscribe(data=>{
      this.notifications = data.notifications
      this.notificationsAmount = this.notifications.length;
      console.log(this.notifications)
    },
    error=>{
      console.log(error)
    })

  }

  readNotifications(){
    this.notificationServe.readNotifications()
      .subscribe(data=>{
          // this.notificationsRead.emit('notifications read');
          this.notificationsAmount=0;
      },
      error=>{
        console.log(error)
      })


  }

}
