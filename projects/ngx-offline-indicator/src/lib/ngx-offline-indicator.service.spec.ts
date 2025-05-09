import { TestBed } from '@angular/core/testing';

import { NgxOfflineIndicatorService } from './ngx-offline-indicator.service';

describe('NgxOfflineIndicatorService', () => {
  let service: NgxOfflineIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOfflineIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
