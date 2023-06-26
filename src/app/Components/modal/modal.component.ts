import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Topic } from 'src/app/Models/topic/Topic.model';
import { AuthService } from 'src/app/Services/auth.service';
import { TopicService } from 'src/app/Services/topic.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  topic!: Topic;

  @Input() public title: string = '';

  topicTitle!: string;
  description!: string;
  category!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private topicService: TopicService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public addTopicToServer(): void {
    if (!this.topicTitle || !this.description || !this.category) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.topic = new Topic(
      this.topicService.fetchTopicsFromServer().then((topics) => {
        return topics.length + 1;
      }) as unknown as string,
      this.topicTitle,
      this.description,
      new Date(),
      this.authService.getUser(),
      [],
      0,
      0,
      'Open',
      this.category,
      []
    );
    try {
      this.topicService.addTopicToServer(this.topic); // add topic to server
      this.snackBar.open('Topic added', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error while adding topic', 'Close', {
        duration: 3000,
      });
    }
    this.router.navigate(['/forum']);
  }
}
