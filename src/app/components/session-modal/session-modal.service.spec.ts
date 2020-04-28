import { TestBed } from '@angular/core/testing';

import { SessionModalService } from './session-modal.service';

describe('SessionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionModalService = TestBed.get(SessionModalService);
    expect(service).toBeTruthy();
  });
});
