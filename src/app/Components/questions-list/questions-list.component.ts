import { Component } from '@angular/core';
import { Topic } from '../../Models/toppic/Topic.model';
import { TopicService } from 'src/app/Services/topic.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {

    protected openedTopics: Topic[] = [];
    protected numberOfOpenedTopics!: number;
    protected numberOfClosedTopics!: number;
    protected closedTopics: Topic[] = [];
    protected topics: Topic[] = [];

    constructor(private topicService: TopicService) { }

    ngOnInit(): void {
      this.numberOfOpenedTopics = this.topicService.countOpenedTopics();
      this.numberOfClosedTopics = this.topicService.countClosedTopics();
      this.openedTopics = this.topicService.getOpenedTopics();
      this.topics = this.topicService.getTopics();
    }
}
