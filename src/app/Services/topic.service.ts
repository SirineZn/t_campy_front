import { Injectable } from '@angular/core';
import { Topic } from '../Models/topic/Topic.model';
import { Comment } from '../Models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  public topics!: Promise<Topic>[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchTopicsFromServer();
  }

  public async fetchTopicsFromServer(): Promise<Topic>[] {
    await this.http
      .get<Topic[]>(
        'http://localhost:8089/TunisieCamp/forum/retrieve-all-forums'
      )
      .subscribe((topics: any) => {
        this.topics = topics;
      });
    return this.topics;
  }

  public async addTopicToServer(topic: Topic): Promise<void> {
    this.http
      .post<Topic>('http://localhost:8089/TunisieCamp/forum/add-forum', topic)
      .subscribe((topic: any) => {
        this.topics.push(topic);
      });
  }

  public getNumberOfOpenedTopics(): number {
    return this.countOpenedTopics();
  }

  public countOpenedTopics(): number {
    let i: number = 0;
    for (let topic of this.topics) {
      if (topic.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public countClosedTopics(): number {
    let i: number = 0;
    for (let topic of this.topics) {
      if (!topic.isOpened()) {
        i++;
      }
    }
    return i;
  }

  public getOpenedTopics(): Topic[] {
    return this.topics.filter((topic) => topic.isOpened());
  }

  public openTopic(topic: Topic) {
    this.topics.find((t) => t.getId() === topic.getId())?.open();
  }

  public closeTopic(topic: Topic) {
    this.topics.find((t) => t.getId() === topic.getId())?.close();
  }

  public deleteTopic(topic: Topic) {
    this.topics = this.topics.filter((t) => t.getId() !== topic.getId());
  }

  public getTopic(id: string): Topic {
    return this.topics.find((t) => t.getId() === id) as Topic;
  }

  public getComments(topic: Topic): Comment[] {
    return topic.getComments();
  }

  public addComment(topic: Topic, comment: Comment) {
    topic.addComment(comment);
  }

  public getTopicsByCategory(category: string): Topic[] {
    return this.topics.filter((t) => t.getCategory() === category);
  }

  public getCategories(): string[] {
    return this.topics
      .map((t) => t.getCategory())
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  public unLike(topic: Topic) {
    topic.unLike();
  }

  public unDislike(topic: Topic) {
    topic.unDislike();
  }

  public getClosedTopics(): Topic[] {
    return this.topics.filter((topic) => !topic.isOpened());
  }

  public like(topic: Topic) {
    topic.like();
  }

  public dislike(topic: Topic) {
    topic.dislike();
  }

  public getCommentByAuthorId(topic: Topic, id: number): Comment {
    return topic.getCommentByAuthorId(id);
  }

  public deleteComment(topic: Topic, comment: Comment) {
    topic.deleteComment(comment);
  }

  public getRecentTopics(): Topic[] {
    return this.topics.sort((a, b) => {
      return b.getCreationDate().getTime() - a.getCreationDate().getTime();
    });
  }

  public getPopularTopics(): Topic[] {
    return this.topics.sort((a, b) => {
      return b.getLikes() - a.getLikes();
    });
  }

  public getUnansweredTopics(): Topic[] {
    return this.topics.filter((topic) => topic.getComments().length === 0);
  }
}
