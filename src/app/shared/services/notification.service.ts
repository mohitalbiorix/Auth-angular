import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private toasterService: ToastrService) {}

  success(message: string): void {
    this.toasterService.success(message, "Success");
  }

  info(message: string): void {
    this.toasterService.info(message, "Info");
  }

  warning(message: string): void {
    this.toasterService.warning(message, "Warning");
  }

  error(message: string): void {
    this.toasterService.error(message, "Error");
  }
}
