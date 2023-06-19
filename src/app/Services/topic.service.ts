import { Injectable } from '@angular/core';
import { Topic } from '../Models/toppic/Topic.model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  public topics: Topic[] = [
    new Topic(
      '1',
      'Essential Camping Gear Checklist',
      'A comprehensive checklist of essential gear for camping trips',
      new Date(2023, 6, 1),
      'John Doe',
      ['camping', 'outdoors', 'gear'],
      100,
      5,
      'Open',
      'Camping',
      ['Great article!', 'Thanks for sharing!']
    ),
    new Topic(
      '2',
      'Top Camping Destinations in the World',
      'Discover the most breathtaking camping destinations around the globe',
      new Date(2023, 6, 15),
      'Jane Smith',
      ['camping', 'travel', 'nature'],
      75,
      10,
      'Closed',
      'Camping'
    ),
    new Topic(
      '3',
      'Camping Recipes: Delicious Meals under the Stars',
      'Learn how to prepare delicious and easy-to-make meals while camping',
      new Date(2023, 7, 10),
      'Sam Wilson',
      ['camping', 'cooking', 'recipes'],
      120,
      8,
      'Open',
      'Camping'
    ),
    new Topic(
      '4',
      'Family-Friendly Camping Activities',
      'Engaging activities for a fun-filled camping experience with your family',
      new Date(2023, 8, 5),
      'Emily Johnson',
      ['camping', 'family', 'activities'],
      90,
      3,
      'Open',
      'Camping'
    ),
    new Topic(
      '5',
      'Wildlife Spotting: Camping Adventures',
      'Discover fascinating wildlife during your camping adventures',
      new Date(2023, 8, 20),
      'Michael Thompson',
      ['camping', 'wildlife', 'nature'],
      65,
      12,
      'Open',
      'Camping'
    ),
    new Topic(
      '6',
      'Camping Hacks: Tips and Tricks',
      'Learn handy camping hacks to make your outdoor experience more enjoyable',
      new Date(2023, 9, 12),
      'Sarah Davis',
      ['camping', 'tips', 'hacks'],
      110,
      7,
      'Closed',
      'Camping'
    ),
    new Topic(
      '7',
      'Solo Camping: Embracing Solitude in Nature',
      'Experience the beauty of solo camping and reconnect with yourself',
      new Date(2023, 9, 28),
      'Matthew Turner',
      ['camping', 'solo', 'nature'],
      80,
      9,
      'Open',
      'Camping'
    ),
  ];

  constructor() {}

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

  public getTopic(id: string): Topic {
    return this.topics.find((t) => t.getId() === id) as Topic;
  }
}