import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/Models/topic/Topic.model';
import { AuthService } from 'src/app/Services/auth.service';
import { TopicService } from 'src/app/Services/topic.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit() {}

  public isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  public openAddTopicModal(): void {
    document.getElementById('add-topic-modal')!.style.display = 'block';
  }
}
