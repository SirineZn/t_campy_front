import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comment } from 'src/app/Models/comment/comment.model';
import { Topic } from 'src/app/Models/topic/Topic.model';
import { TopicService } from 'src/app/Services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input()
  public topic!: Topic;
  id!: number;
  sub!: any;

  @ViewChild('popup') popup!: ElementRef;

  public comment!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.topicService.fetchTopicFromServer(this.id).then((topic) => {
        this.topic = topic;
      });
    });
  }

  public deleteTopicFromServer() {
    this.topicService.deleteTopicFromServer(this.topic);
    // this.topicService.deleteTopic(this.topic);
  }

  public editTopicInServer() {
    this.router.navigate(['/edit-topic', this.topic.getId()]);
  }

  public closeTopicInServer() {
    this.topicService.closeTopic(this.topic);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['topics']);
  }

  public getComments() {
    return this.topic.getComments();
  }

  public getTopic() {
    return this.topic;
  }

  public getTopicId() {
    return this.topic.getId();
  }

  public addComment(comment: string) {
    comment = comment.trim();
    if (!comment) {
      return;
    }
    let newComment = new Comment(
      this.topic.getComments().length,
      comment,
      'neutral',
      1,
      Number(this.topic.getId()),
      new Date(),
      new Date()
    );
    this.topicService.addCommentToServer(this.topic, newComment);
    // this.topicService.addComment(this.topic, newComment);
    this.comment = '';
  }

  public deleteComment(comment: Comment) {
    this.topicService.deleteComment(this.topic, comment);
  }
}
