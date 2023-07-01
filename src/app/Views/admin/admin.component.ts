import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  currentUser = this.authService.getUser();
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    if (this.userService.isAdmin()) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['/']);
    }

    this.user = this.authService.getUser();
  }

  ngOnInit() {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
