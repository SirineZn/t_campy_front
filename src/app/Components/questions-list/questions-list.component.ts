import { Component } from '@angular/core';
import { Forum } from '../../Models/forum/forum.model';
import { ForumService } from 'src/app/Services/forum.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent {
  openedForums: Forum[] = [];
  numberOfOpenedForums: number = 0;
  numberOfClosedForums: number = 0;
  closedForums: Forum[] = [];
  forums!: Forum[];
  Status: string = 'all';

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.countOpenedForums().then((number) => {
      this.numberOfOpenedForums = number;
    });
    this.forumService.countClosedForums().then((number) => {
      this.numberOfClosedForums = number;
    });
    this.forumService.getOpenedForums().then((Forums) => {
      this.openedForums = Forums;
    });
    this.forumService.getClosedForums().then((Forums) => {
      this.closedForums = Forums;
    });
    this.forumService.fetchForumsFromServer().then((Forums) => {
      this.forums = Forums;
    });
    // this.Forums = this.forumService.getForums();
  }

  sort($event: any) {
    this.Status = $event.value;
    if (this.Status === 'recent') {
      this.forumService.getRecentForums().then((Forums) => {
        return Forums as Forum[];
      });
    } else if (this.Status === 'popular') {
      this.forumService.getPopularForums().then((Forums) => {
        return Forums as Forum[];
      });
    } else if (this.Status === 'unanswered') {
      this.forumService.getUnansweredForums().then((Forums) => {
        return Forums as Forum[];
      });
    } else {
      this.forumService.fetchForumsFromServer();
    }
  }

  get openedForumsList(): Forum[] {
    return this.openedForums;
  }

  get closedForumsList(): Forum[] {
    return this.closedForums;
  }

  get numberOfOpenedForumsList(): number {
    return this.numberOfOpenedForums;
  }

  get numberOfClosedForumsList(): number {
    return this.numberOfClosedForums;
  }

  get ForumsLength(): number {
    return this.forums.length;
  }

  get ForumsList(): Forum[] {
    return this.forums;
  }

  public getForums(): Forum[] {
    return this.forums;
  }

  public getForum(id: string): Forum {
    return this.forumService.getForum(Number(id));
  }
}
