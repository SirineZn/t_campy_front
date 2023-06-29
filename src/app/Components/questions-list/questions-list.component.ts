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
  protected numberOfOpenedTopics: number = 0;
  protected numberOfClosedTopics: number = 0;
  protected closedTopics: Topic[] = [];
  protected topics: Topic[] = [];
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
    this.topicService.fetchTopicsFromServer().then((topics) => {
      this.topics = topics as Topic[];
    });
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
      this.topicService.fetchTopicsFromServer().then((topics) => {
        return topics as Topic[];
      });
    }
  }
}
