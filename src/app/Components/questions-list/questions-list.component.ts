import { Component } from '@angular/core';
import { Topic } from '../Utils/chat-card/Topic.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {
  public topics: Topic[] = [
        new Topic( '1', 'Title 1', 'Description 1', new Date(), 'Author 1', ['General', 'Camping'], 1, 2, 'Camping'),
        new Topic( '2', 'Title 2', 'Description 2', new Date(), 'Author 2', ['Ideas', 'General'], 1, 2, 'Camping'),
        new Topic( '3', 'Title 3', 'Description 3', new Date(), 'Author 3', ['Offer'], 1, 2, 'Camping'),
    ];
}
