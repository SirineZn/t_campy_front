import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    // private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    if (this.userService.isAdmin()) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  // public logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/']);
  // }
}
