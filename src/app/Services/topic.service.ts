import { Injectable } from '@angular/core';
import { Topic } from '../Models/topic/Topic.model';
import { Comment } from '../Models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  public topics!: Promise<Topic[]>;
  public StaticTopics: Topic[] = [
    new Topic(
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
      []
    ),
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.fetchTopicsFromServer();
    this.getTopics();
  }

  public async fetchTopicsFromServer(): Promise<Topic[]> {
    try {
      this.topics = this.http.get<Topic[]>(
        'http://localhost:8089/TunisieCamp/forum/retrieve-all-forums'
      ) as unknown as Promise<Topic[]>;
      return this.topics;
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching topics', 'Close', {
        duration: 3000,
      });
      return [];
    }
  }

  public async fetchTopicFromServer(id: number): Promise<Topic> {
    try {
      return this.http.get<Topic>(
        'http://localhost:8089/TunisieCamp/forum/retrieve-forum/' + id
      ) as unknown as Promise<Topic>;
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while fetching topic', 'Close', {
        duration: 3000,
      });
      return new Topic(
        '0',
        'Error',
        'Error',
        new Date(),
        this.authService.getUsername(),
        [],
        0,
        0,
        'Open',
        'Error',
        []
      );
    }
  }

  public getTopic(id: number): Topic {
    return this.StaticTopics.find((t) => t.getId() === id.toString())!;
  }

  public getTopics(): Topic[] {
    return this.StaticTopics;
  }

  public async addTopicToServer(topic: Topic): Promise<void> {
    try {
      this.http
        .post<Topic>('http://localhost:8089/TunisieCamp/forum/add-forum', topic)
        .subscribe(async (topic: any) => {
          (await this.topics).push(topic);
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while adding topic', 'Close', {
        duration: 3000,
      });
    }
  }

  public async updateTopicOnServer(topic: Topic): Promise<void> {
    try {
      this.http
        .put<Topic>(
          'http://localhost:8089/TunisieCamp/forum/update-forum/' +
            topic.getId(),
          topic
        )
        .subscribe(async (topic: any) => {
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getTitle();
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getDescription();
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getCategory();
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getLikes();
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getDislikes();
          (await this.topics)
            .find((t) => t.getId() === topic.getId())!
            .getComments();
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Error while updating topic', 'Close', {
        duration: 3000,
      });
    }
  }

  public async countOpenedTopics(): Promise<number> {
    let i: number = 0;
    for (let topic of await this.StaticTopics) {
      if (topic.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async countClosedTopics(): Promise<number> {
    let i: number = 0;
    for (let topic of await this.StaticTopics) {
      if (!topic.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public async getOpenedTopics(): Promise<Topic[]> {
    return (await this.topics).filter((topic) => topic.isOpened());
  }

  public async openTopic(topic: Topic) {
    (await this.topics).find((t) => t.getId() === topic.getId())?.open();
  }

  public async closeTopic(topic: Topic) {
    (await this.topics).find((t) => t.getId() === topic.getId())?.close();
  }

  public async deleteTopicFromServer(topic: Topic) {
    try {
      this.http
        .delete<Topic>(
          'http://localhost:8089/TunisieCamp/forum/delete-forum/' +
            topic.getId()
        )
        .subscribe(async (topic: any) => {
          (await this.topics).splice(
            (await this.topics).findIndex((t) => t.getId() === topic.getId()),
            1
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  public async getTopicById(id: string): Promise<Topic> {
    return (await this.topics).find((t) => t.getId() === id)!;
  }

  public async getComments(topic: Topic): Promise<Comment[]> {
    return topic.getComments();
  }

  public async addCommentToServer(topic: Topic, comment: Comment) {
    this.http
      .post<Topic>(
        'http://localhost:8089/TunisieCamp/forum/assign-Feedback-To-Forum/' +
          topic.getId(),
        comment
      )
      .subscribe(async (topic: any) => {
        (await this.topics)
          .find((t) => t.getId() === topic.getId())
          ?.addComment(comment);
      });
  }

  public addComment(topic: Topic, comment: Comment) {
    topic.addComment(comment);
  }

  public async updateCommentOnServer(topic: Topic, comment: Comment) {
    this.http.put<Topic>(
      'http://localhost:8089/TunisieCamp/Feedback/update-Feedback/' +
        topic.getId() +
        '/' +
        comment.getId(),
      comment
    );
  }

  public async getTopicsByCategory(category: string): Promise<Topic[]> {
    return (await this.topics).filter((t) => t.getCategory() === category);
  }

  public async getCategories(): Promise<string[]> {
    return (await this.topics).map((t) => t.getCategory());
  }

  public async unLike(topic: Topic) {
    topic.unLike();
  }

  public async unDislike(topic: Topic) {
    topic.unDislike();
  }

  public async getClosedTopics(): Promise<Topic[]> {
    return (await this.topics).filter((topic) => !topic.isOpened());
  }

  public async like(topic: Topic) {
    topic.like();
  }

  public async dislike(topic: Topic) {
    topic.dislike();
  }

  public async getCommentByAuthorId(
    topic: Topic,
    id: number
  ): Promise<Comment> {
    return topic.getComments().find((c) => c.getAuthorId() === id)!;
  }

  public async deleteComment(topic: Topic, comment: Comment) {
    this.http
      .delete<Topic>(
        'http://localhost:8089/TunisieCamp/Feedback/delete-Feedback/' +
          topic.getId() +
          '/' +
          comment.getId()
      )
      .subscribe(async (topic: any) => {
        (await this.topics)
          .find((t) => t.getId() === topic.getId())
          ?.deleteComment(comment);
      });
  }

  public async getRecentTopics(): Promise<Topic[]> {
    return (await this.topics).sort((a, b) => {
      return b.getCreationDate().getTime() - a.getCreationDate().getTime();
    });
  }

  public async getPopularTopics(): Promise<Topic[]> {
    return (await this.topics).sort((a, b) => {
      return b.getLikes() - a.getLikes();
    });
  }

  public async getUnansweredTopics(): Promise<Topic[]> {
    return (await this.topics).filter(
      (topic) => topic.getComments().length === 0
    );
  }
}
