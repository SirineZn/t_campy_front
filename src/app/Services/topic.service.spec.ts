import { TestBed } from '@angular/core/testing';

import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return topics', () => {
    expect(service.getTopics().length).toBeGreaterThan(0);
  });
});
