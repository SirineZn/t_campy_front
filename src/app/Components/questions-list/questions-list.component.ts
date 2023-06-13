import { Component } from '@angular/core';
import { Topic } from '../Utils/chat-card/Topic.model';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent {
  public topics: Topic[] = [
        new Topic( '1', 'Title 1', 'Description 1', new Date(), 'Author 1', ['tag1', 'tag2'], 1, 2, 'Category 1'),
        new Topic( '2', 'Title 2', 'Description 2', new Date(), 'Author 2', ['tag1', 'tag2'], 1, 2, 'Category 2'),
        new Topic( '3', 'Title 3', 'Description 3', new Date(), 'Author 3', ['tag1', 'tag2'], 1, 2, 'Category 3'),
    ];
}
