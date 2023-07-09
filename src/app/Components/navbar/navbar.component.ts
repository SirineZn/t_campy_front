import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() public title: string = '';

  hidden: boolean = false;
  notifCount: number = 0;

  routerlink: Router;

  constructor(private router: Router, private authService: AuthService) {
    this.routerlink = router;
    // this.notifCount = this.authService.getNotifCount();
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }
}
