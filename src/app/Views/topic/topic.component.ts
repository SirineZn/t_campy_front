import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comment } from 'src/app/Models/comment/comment.model';
import { Forum } from 'src/app/Models/forum/forum.model';
import { ForumService } from 'src/app/Services/forum.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input()
  public forum!: Forum;
  id!: number;
  sub!: any;

  @ViewChild('popup') popup!: ElementRef;

  public comment!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private forumService: ForumService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      // this.forumService.fetchForumFromServer(this.id).then((forum) => {
      //   this.forum = forum;
      // });
      this.forum = this.forumService.getForum(this.id);
    });
  }

  public deleteForumFromServer() {
    this.forumService.deleteForumFromServer(this.forum);
    // this.forumService.deleteForum(this.forum);
  }

  public editForumInServer() {
    this.router.navigate(['/edit-forum', this.forum.getId()]);
  }

  public closeForumInServer() {
    this.forumService.closeForum(this.forum);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['topics']);
  }

  public getComments() {
    return this.forum.getComments();
  }

  public getForum() {
    return this.forum;
  }

  public getForumId() {
    return this.forum.getId();
  }

  public addComment(comment: string) {
    comment = comment.trim();
    if (!comment) {
      return;
    }
    let newComment = new Comment(
      this.forum.getComments().length,
      comment,
      'neutral',
      1,
      Number(this.forum.getId()),
      new Date(),
      new Date()
    );
    // this.forumService.addCommentToServer(this.forum, newComment);
    this.forumService.addComment(this.forum, newComment);
    this.comment = '';
  }

  public deleteComment(comment: Comment) {
    this.forumService.deleteComment(this.forum, comment);
  }
}
