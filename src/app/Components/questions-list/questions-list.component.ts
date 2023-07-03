import { Component } from '@angular/core';
import { Topic } from '../../Models/topic/Topic.model';
import { TopicService } from 'src/app/Services/topic.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  openedTopics: Topic[] = [];
  numberOfOpenedTopics: number = 0;
  numberOfClosedTopics: number = 0;
  closedTopics: Topic[] = [];
  topics!: Topic[];
  Status: string = 'all';

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.countOpenedTopics().then((number) => {
      this.numberOfOpenedTopics = number;
    });
    this.topicService.countClosedTopics().then((number) => {
      this.numberOfClosedTopics = number;
    });
    this.topicService.getOpenedTopics().then((topics) => {
      this.openedTopics = topics;
    });
    this.topicService.getClosedTopics().then((topics) => {
      this.closedTopics = topics;
    });
    this.topics = this.topicService.fetchTopicsFromServer();
    console.log('Topics: ', this.topics);
    // this.topics = this.topicService.getTopics();
  }

  sort($event: any) {
    this.Status = $event.value;
    if (this.Status === 'recent') {
      this.topicService.getRecentTopics().then((topics) => {
        return topics as Topic[];
      });
    } else if (this.Status === 'popular') {
      this.topicService.getPopularTopics().then((topics) => {
        return topics as Topic[];
      });
    } else if (this.Status === 'unanswered') {
      this.topicService.getUnansweredTopics().then((topics) => {
        return topics as Topic[];
      });
    } else {
      this.topicService.fetchTopicsFromServer();
    }
  }

  get openedTopicsList(): Topic[] {
    return this.openedTopics;
  }

  get closedTopicsList(): Topic[] {
    return this.closedTopics;
  }

  get numberOfOpenedTopicsList(): number {
    return this.numberOfOpenedTopics;
  }

  get numberOfClosedTopicsList(): number {
    return this.numberOfClosedTopics;
  }

  get topicsLength(): number {
    return this.topics.length;
  }

  get topicsList(): Topic[] {
    return this.topics;
  }

  public getTopics(): Topic[] {
    return this.topics;
  }

  public getTopic(id: string): Topic {
    return this.topicService.getTopic(Number(id));
  }
}
