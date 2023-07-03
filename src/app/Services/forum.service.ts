import { Injectable } from '@angular/core';
import { Forum } from '../Models/forum/forum.model';
import { Comment } from '../Models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  public forums!: Forum[];
  Forum!: Forum;
  public StaticForums: Forum[] = [
    new Forum(
      '1',
      'How to use this forum?',
      "I am new to this forum and I don't know how to use it. Can someone help me?",
      new Date(),
      this.authService.getUsername(),
      [],
      0,
      0,
      'Open',
      'Help',
      [],
      []
    ),
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchForumsFromServer();
    // this.getForums();
  }

  public fetchForumsFromServer(): Forum[] {
    this.http
      .get<Forum[]>('http://localhost:8089/forum/retrieve-all-forums')
      .subscribe((Forums) => {
        this.forums = Forum.fromJsonArray(Forums);
      });
    return this.forums;
  }

  public async fetchForumFromServer(id: number): Promise<Forum> {
    try {
      return this.http.get<Forum>(
        'http://localhost:8089/forum/retrieve-forum/' + id
      ) as unknown as Promise<Forum>;
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching Forum', 'Close', {
        duration: 3000,
      });
      return Forum.empty();
    }
  }

  public getForum(id: number): Forum {
    return this.StaticForums.find((t) => t.getId() === id.toString())!;
  }

  public getForums(): Forum[] {
    return this.forums;
  }

  public async addForumToServer(Forum: Forum): Promise<void> {
    try {
      this.http
        .post<Forum>('http://localhost:8089/forum/add-forum', Forum.toJson())
        .subscribe(async (Forum: any) => {
          (await this.forums).push(Forum);
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while adding Forum', 'Close', {
        duration: 3000,
      });
    }
  }

  public async updateForumOnServer(Forum: Forum): Promise<void> {
    try {
      this.http
        .put<Forum>(
          'http://localhost:8089/forum/update-forum/' + Forum.getId(),
          Forum.toJson()
        )
        .subscribe(async (Forum: any) => {
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getTitle();
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getDescription();
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getCategory();
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getLikes();
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getDislikes();
          (await this.forums)
            .find((t) => t.getId() === Forum.getId())!
            .getComments();
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while updating Forum', 'Close', {
        duration: 3000,
      });
    }
  }

  public async countOpenedForums(): Promise<number> {
    let i: number = 0;
    for (let Forum of await this.forums) {
      if (Forum.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async countClosedForums(): Promise<number> {
    let i: number = 0;
    for (let Forum of await this.StaticForums) {
      if (!Forum.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async getOpenedForums(): Promise<Forum[]> {
    return (await this.forums).filter((forum) => forum.isOpened());
  }

  public async openForum(forum: Forum) {
    (await this.forums).find((t) => t.getId() === forum.getId())?.open();
  }

  public async closeForum(forum: Forum) {
    (await this.forums).find((t) => t.getId() === forum.getId())?.close();
  }

  public async deleteForumFromServer(forum: Forum) {
    try {
      this.http
        .delete<Forum>(
          'http://localhost:8089/forum/delete-forum/' + forum.getId()
        )
        .subscribe(async (forum: any) => {
          (await this.forums).splice(
            (await this.forums).findIndex((t) => t.getId() === forum.getId()),
            1
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async getForumById(id: string): Promise<Forum> {
    return (await this.forums).find((t) => t.getId() === id)!;
  }

  public async getComments(Forum: Forum): Promise<Comment[]> {
    return Forum.getComments();
  }

  public async addCommentToServer(Forum: Forum, comment: Comment) {
    this.http
      .post<Forum>(
        'http://localhost:8089/forum/assign-Feedback-To-Forum/' + Forum.getId(),
        comment
      )
      .subscribe(async (forum: any) => {
        (await this.forums)
          .find((t) => t.getId() === forum.getId())
          ?.addComment(comment);
      });
  }

  public addComment(Forum: Forum, comment: Comment) {
    Forum.addComment(comment);
  }

  public async updateCommentOnServer(Forum: Forum, comment: Comment) {
    this.http.put<Forum>(
      'http://localhost:8089/Feedback/update-Feedback/' +
        Forum.getId() +
        '/' +
        comment.getId(),
      comment
    );
  }

  public async getForumsByCategory(category: string): Promise<Forum[]> {
    return (await this.forums).filter((t) => t.getCategory() === category);
  }

  public async getCategories(): Promise<string[]> {
    return (await this.forums).map((t) => t.getCategory());
  }

  public async unLike(Forum: Forum) {
    Forum.unLike();
  }

  public async unDislike(Forum: Forum) {
    Forum.unDislike();
  }

  public async getClosedForums(): Promise<Forum[]> {
    return (await this.forums).filter((forum) => !forum.isOpened());
  }

  public async like(forum: Forum) {
    forum.like();
  }

  public async dislike(forum: Forum) {
    forum.dislike();
  }

  public async getCommentByAuthorId(
    forum: Forum,
    id: number
  ): Promise<Comment> {
    return forum.getComments().find((c) => c.getAuthorId() === id)!;
  }

  public async deleteComment(forum: Forum, comment: Comment) {
    this.http
      .delete<Forum>(
        'http://localhost:8089/Feedback/delete-Feedback/' +
          forum.getId() +
          '/' +
          comment.getId()
      )
      .subscribe(async (forum: any) => {
        (await this.forums)
          .find((t) => t.getId() === forum.getId())
          ?.deleteComment(comment);
      });
  }

  public async getRecentForums(): Promise<Forum[]> {
    return (await this.forums).sort((a, b) => {
      return b.getCreationDate().getTime() - a.getCreationDate().getTime();
    });
  }

  public async getPopularForums(): Promise<Forum[]> {
    return (await this.forums).sort((a, b) => {
      return b.getLikes() - a.getLikes();
    });
  }

  public async getUnansweredForums(): Promise<Forum[]> {
    return (await this.forums).filter(
      (forum) => forum.getComments().length === 0
    );
  }
}
