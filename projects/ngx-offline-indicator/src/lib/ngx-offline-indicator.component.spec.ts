import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOfflineIndicatorComponent } from './ngx-offline-indicator.component';

describe('NgxOfflineIndicatorComponent', () => {
  let component: NgxOfflineIndicatorComponent;
  let fixture: ComponentFixture<NgxOfflineIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxOfflineIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxOfflineIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
