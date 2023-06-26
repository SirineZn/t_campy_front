import { Injectable } from '@angular/core';
import { Topic } from '../Models/topic/Topic.model';
import { Comment } from '../Models/comment/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private baseUrl: string = 'http://localhost:8089/TunisieCamp/forums';

  public topics: Topic[] = [];
  // public topics: Topic[] = [
  //   new Topic(
  //     '1',
  //     'Essential Camping Gear Checklist',
  //     'A comprehensive checklist of essential gear for camping trips',
  //     new Date(2023, 6, 1),
  //     'John Doe',
  //     ['camping', 'outdoors', 'gear'],
  //     100,
  //     5,
  //     'Open',
  //     'Camping',
  //     [
  //       new Comment(
  //         0,
  //         'Great Topic',
  //         'positive',
  //         0,
  //         1,
  //         new Date(2023, 6, 1),
  //         new Date(2023, 6, 1)
  //       ),
  //       new Comment(
  //         1,
  //         'Thanks for sharing!',
  //         'positive',
  //         1,
  //         1,
  //         new Date(2023, 6, 1),
  //         new Date(2023, 6, 1)
  //       ),
  //     ]
  //   ),
  //   new Topic(
  //     '2',
  //     'Top Camping Destinations in the World',
  //     'Discover the most breathtaking camping destinations around the globe',
  //     new Date(2023, 6, 15),
  //     'Jane Smith',
  //     ['camping', 'travel', 'nature'],
  //     75,
  //     10,
  //     'Closed',
  //     'Camping',
  //     []
  //   ),
  //   new Topic(
  //     '3',
  //     'Camping Recipes: Delicious Meals under the Stars',
  //     'Learn how to prepare delicious and easy-to-make meals while camping',
  //     new Date(2023, 7, 10),
  //     'Sam Wilson',
  //     ['camping', 'cooking', 'recipes'],
  //     120,
  //     8,
  //     'Open',
  //     'Camping',
  //     []
  //   ),
  //   new Topic(
  //     '4',
  //     'Family-Friendly Camping Activities',
  //     'Engaging activities for a fun-filled camping experience with your family',
  //     new Date(2023, 8, 5),
  //     'Emily Johnson',
  //     ['camping', 'family', 'activities'],
  //     90,
  //     3,
  //     'Open',
  //     'Camping',
  //     []
  //   ),
  //   new Topic(
  //     '5',
  //     'Wildlife Spotting: Camping Adventures',
  //     'Discover fascinating wildlife during your camping adventures',
  //     new Date(2023, 8, 20),
  //     'Michael Thompson',
  //     ['camping', 'wildlife', 'nature'],
  //     65,
  //     12,
  //     'Open',
  //     'Camping',
  //     []
  //   ),
  //   new Topic(
  //     '6',
  //     'Camping Hacks: Tips and Tricks',
  //     'Learn handy camping hacks to make your outdoor experience more enjoyable',
  //     new Date(2023, 9, 12),
  //     'Sarah Davis',
  //     ['camping', 'tips', 'hacks'],
  //     110,
  //     7,
  //     'Closed',
  //     'Camping',
  //     []
  //   ),
  //   new Topic(
  //     '7',
  //     'Solo Camping: Embracing Solitude in Nature',
  //     'Experience the beauty of solo camping and reconnect with yourself',
  //     new Date(2023, 9, 28),
  //     'Matthew Turner',
  //     ['camping', 'solo', 'nature'],
  //     80,
  //     9,
  //     'Open',
  //     'Camping',
  //     []
  //   ),
  // ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.topics = this.getTopicsFromServer();
  }

  public getTopicsFromServer(): Topic[] {
    try {
      this.http
        .get(this.baseUrl + 'retrieve-all-forums')
        .subscribe((data: any) => {
          this.topics = data;
        });
    } catch (error) {
      console.error(error);
    }
    return this.topics;
  }

  public getNumberOfOpenedTopics(): number {
    return this.countOpenedTopics();
  }

  public getTopics(): Topic[] {
    return this.topics;
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

  public addTopic(topic: Topic) {
    this.topics.push(topic);
  }

  public addTopicToServer(topic: Topic) {
    this.http
      .post(this.baseUrl + 'add-forum', topic.toJson())
      .subscribe((data: any) => {
        this.topics.push(data);
      });
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
