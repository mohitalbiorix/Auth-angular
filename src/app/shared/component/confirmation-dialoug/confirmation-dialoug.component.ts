import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialoug',
  templateUrl: './confirmation-dialoug.component.html',
  styleUrls: ['./confirmation-dialoug.component.scss'],
})
export class ConfirmationDialougComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialougComponent>
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
