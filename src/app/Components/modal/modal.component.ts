import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/Models/Complaint/complaint';
import { Topic } from 'src/app/Models/topic/Topic.model';
import { AuthService } from 'src/app/Services/auth.service';
import { ComplaintService } from 'src/app/Services/complaint.service';
import { TopicService } from 'src/app/Services/topic.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  topic!: Topic;
  complaint!: Complaint;

  title!: string;
  description!: string;
  category!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private topicService: TopicService,
    private complaintService: ComplaintService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public addTopicToServer(): void {
    if (!this.title || !this.description || !this.category) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.topic = new Topic(
      (this.topicService.getTopics().length + 1).toString(),
      this.title,
      this.description,
      new Date(),
      this.authService.getUsername(),
      [],
      0,
      0,
      'Open',
      this.category,
      [],
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
    this.title = '';
    this.description = '';
    this.router.navigate(['/forum']);
  }

  public addComplaint(): void {
    if (!this.title || !this.description) {
      this.snackBar.open('Please fill all the fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.complaint = new Complaint(
      this.complaintService.getComplaints().length + 1,
      this.title,
      this.description,
      new Date(),
      '',
      Number(this.authService.getUser()),
      0
    );
    try {
      this.complaintService.addComplaintToServer(this.complaint); // add complaint to server
      // this.complaintService.addComplaint(this.complaint); // add complaint not to server
      this.snackBar.open('Complaint added', 'Close', {
        duration: 3000,
      });
      this.title = '';
      this.description = '';
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error while adding complaint', 'Close', {
        duration: 3000,
      });
    }
    this.title = '';
    this.description = '';
  }
}
