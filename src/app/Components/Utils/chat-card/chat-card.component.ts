import { Component, Input } from '@angular/core';
import { Topic } from './Topic.model';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent {
  @Input()
  public card!: Topic;
}
