import { Component } from '@angular/core';
import { Topic } from '../Utils/chat-card/Topic.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {
  public topics: Topic[] = [
        new Topic( '1', 'Title 1', 'Description 1', new Date(), 'Author 1', ['General', 'Camping'], 1, 2,"Open" ,'Camping'),
        new Topic( '2', 'Title 2', 'Description 2', new Date(), 'Author 2', ['Ideas', 'General'], 1, 2,"Open" ,'Camping'),
        new Topic( '3', 'Title 3', 'Description 3', new Date(), 'Author 3', ['Offer'], 1, 2,"Closed" ,'Camping'),
    ];

    protected openedTopics: Topic[] = [];
    protected numberOfOpenedTopics!: number;
    protected numberOfClosedTopics!: number;

    ngOnInit(): void {
      this.numberOfOpenedTopics = this.countOpenedTopics();
      this.numberOfClosedTopics = this.countClosedTopics();
    }

    public getNumberOfOpenedTopics(): number {
        return this.numberOfOpenedTopics;
    }

    public getTopics(): Topic[] {
        return this.topics;
    }

    public countOpenedTopics(): number
    {
      let i: number = 0;
      for (let topic of this.topics) {
          if (topic.isOpened()) {
              i++;
          }
        }
      return i;
    }

    public countClosedTopics(): number
    {
      let i: number = 0;
      for (let topic of this.topics) {
          if (!topic.isOpened()) {
              i++;
          }
        }
      return i;
    }

    public getOpenedTopics(): Topic[] {
        return this.openedTopics;
    }

    public openTopic(topic: Topic) {
        this.openedTopics.push(topic);
    }
}
