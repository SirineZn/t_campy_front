import { Component, Input, OnInit } from '@angular/core';
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

  public commentMsg!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private topicService: TopicService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.topic = this.topicService.getTopic(params['id']);
    });
  }

  public deleteTopic() {
    this.topicService.deleteTopic(this.topic);
  }

  public editTopic() {
    this.router.navigate(['/edit-topic', this.topic.getId()]);
  }

  public closeTopic() {
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
      1,
      1,
      new Date(),
      new Date()
    );
    this.topicService.addComment(this.topic, newComment);
    this.commentMsg = '';
  }

  public getCommentAuthorById(id: number) {
    return 'Author';
  }

  public getCommentAuthorId(id: number) {
    return id;
  }
}
