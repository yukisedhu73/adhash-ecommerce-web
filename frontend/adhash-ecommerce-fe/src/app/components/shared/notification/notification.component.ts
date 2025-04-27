// src/app/shared/components/notification/notification.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification" *ngIf="notificationService.notification$ | async as message">
      <div class="notification-content">
        <span>{{ message }}</span>
        <button (click)="close()">×</button>
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  close() {
    this.notificationService.hide();
  }
}
