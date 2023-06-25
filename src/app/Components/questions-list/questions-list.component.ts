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
  protected openedTopics: Topic[] = [];
  protected numberOfOpenedTopics!: number;
  protected numberOfClosedTopics!: number;
  protected closedTopics: Topic[] = [];
  protected topics: Promise<Topic>[] = [];
  Status: any;

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.numberOfOpenedTopics = this.topicService.countOpenedTopics();
    this.numberOfClosedTopics = this.topicService.countClosedTopics();
    this.openedTopics = this.topicService.getOpenedTopics();
    this.closedTopics = this.topicService.getClosedTopics();
    this.topics = this.topicService.fetchTopicsFromServer();
  }

  sort($event: any) {
    this.Status = $event.value;
    if (this.Status === 'recent') {
      this.topics = this.topicService.getRecentTopics();
    } else if (this.Status === 'popular') {
      this.topics = this.topicService.getPopularTopics();
    } else if (this.Status === 'unanswered') {
      this.topics = this.topicService.getUnansweredTopics();
    } else {
      this.topics = this.topicService.fetchTopicsFromServer();
    }
  }
}
