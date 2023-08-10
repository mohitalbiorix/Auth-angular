import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningComponent } from './component/warning/warning.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OnlyNumericDirective } from './directives/only-numeric.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmationDialougComponent } from './component/confirmation-dialoug/confirmation-dialoug.component';
import {MatDialogModule} from '@angular/material/dialog';
import { InputTrimDirective } from './directives/Input-trim.directives';
import { OnlyAlphabetDirective } from './directives/only-alphabet.directive';

@NgModule({
  declarations: [WarningComponent, OnlyNumericDirective, ConfirmationDialougComponent, InputTrimDirective, OnlyAlphabetDirective],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    InputTrimDirective,
    OnlyNumericDirective,
    OnlyAlphabetDirective
  ],
})
export class SharedModule {}
