import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent{

  constructor(private router:Router){}

  goToHome() {
    this.router.navigate(['/']);
  }

}
