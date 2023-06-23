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

  routerlink: Router;

  constructor(private router: Router, private authService: AuthService) {
    this.routerlink = router;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isLogged(): boolean {
    return this.authService.isLogged();
  }
}
