import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

import { NgxOfflineIndicatorService } from './ngx-offline-indicator.service';
import { NgxOfflineIndicatorConfigService } from './ngx-offline-indicator-config.service';
import {
  IndicatorPosition,
  IndicatorType,
  OfflineIndicatorConfig
} from './ngx-offline-indicator.models';

@Component({
  selector: 'ngx-offline-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="ngx-offline-indicator"
      [ngClass]="[
        'ngx-offline-indicator--' + getConfig().type,
        'ngx-offline-indicator--' + getConfig().position,
        'ngx-offline-indicator--' + getConfig().theme,
        isOnline ? 'ngx-offline-indicator--online' : 'ngx-offline-indicator--offline',
        getConfig().cssClass || ''
      ]"
      [style.zIndex]="getConfig().zIndex"
    >
      <div class="ngx-offline-indicator__content">
        <span *ngIf="getConfig().showIcons" class="ngx-offline-indicator__icon">
          <svg *ngIf="!isOnline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.41 10.41L17.99 9L16.58 10.41L17.99 11.82L19.41 10.41ZM13.99 6C11.8 6 9.91 7.07 8.83 8.68L11.39 11.24C11.86 10.51 12.87 10 13.99 10C15.66 10 16.99 11.33 16.99 13C16.99 14.12 16.48 15.14 15.75 15.6L18.31 18.16C19.92 17.08 20.99 15.2 20.99 13C20.99 9.14 17.85 6 13.99 6ZM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9L3 12C4.3 10.4 5.87 9.22 7.61 8.5L9.08 9.96C8.29 10.39 7.56 10.94 6.94 11.59L9 14C10.3 12.4 12.53 11.5 14.99 11.5C15.18 11.5 15.37 11.51 15.56 11.52L19.95 15.92L21.95 3.05L2 3.05ZM13.99 20C11.46 20 9.12 19.1 7.42 17.56L5.9 19.08C8.08 21.06 10.94 22 13.99 22C17.55 22 20.87 20.51 23.23 17.96L21.28 15.73C19.37 17.69 16.78 19 13.99 19V20Z"/>
          </svg>
          <svg *ngIf="isOnline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L3 12C5.67 9.33 9.33 8 13 8C16.67 8 20.33 9.33 23 12L25 9C21.67 5.67 17.33 4 13 4C8.67 4 4.33 5.67 1 9ZM13 12C10.8 12 8.67 12.67 6.8 14L9 16C10.13 15.33 11.5 15 13 15C14.5 15 15.87 15.33 17 16L19.2 14C17.33 12.67 15.2 12 13 12ZM13 16C11.33 16 9.67 16.67 8 18L13 23L18 18C16.33 16.67 14.67 16 13 16Z"/>
          </svg>
        </span>
        <span class="ngx-offline-indicator__text">
          {{ isOnline ? getConfig().onlineText : getConfig().offlineText }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .ngx-offline-indicator {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      transition: all 0.3s ease;
    }

    .ngx-offline-indicator__content {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: 4px;
    }

    .ngx-offline-indicator__icon {
      display: inline-flex;
      margin-right: 8px;
    }

    .ngx-offline-indicator__icon svg {
      width: 18px;
      height: 18px;
    }

    /* Indicator types */
    .ngx-offline-indicator--banner {
      position: fixed;
      left: 0;
      right: 0;
    }

    .ngx-offline-indicator--floating {
      position: fixed;
      max-width: 300px;
    }

    .ngx-offline-indicator--status-text {
      position: fixed;
      max-width: 200px;
    }

    /* Positions */
    .ngx-offline-indicator--top {
      top: 0;
    }

    .ngx-offline-indicator--bottom {
      bottom: 0;
    }

    .ngx-offline-indicator--top-left {
      top: 16px;
      left: 16px;
    }

    .ngx-offline-indicator--top-right {
      top: 16px;
      right: 16px;
    }

    .ngx-offline-indicator--bottom-left {
      bottom: 16px;
      left: 16px;
    }

    .ngx-offline-indicator--bottom-right {
      bottom: 16px;
      right: 16px;
    }

    /* Themes */
    .ngx-offline-indicator--light.ngx-offline-indicator--offline .ngx-offline-indicator__content {
      background-color: #ff4d4f;
      color: white;
    }

    .ngx-offline-indicator--light.ngx-offline-indicator--online .ngx-offline-indicator__content {
      background-color: #52c41a;
      color: white;
    }

    .ngx-offline-indicator--dark.ngx-offline-indicator--offline .ngx-offline-indicator__content {
      background-color: #a61d24;
      color: white;
    }

    .ngx-offline-indicator--dark.ngx-offline-indicator--online .ngx-offline-indicator__content {
      background-color: #49aa19;
      color: white;
    }

    .ngx-offline-indicator__icon svg {
      fill: currentColor;
    }
  `]
})
export class NgxOfflineIndicatorComponent implements OnInit, OnDestroy {
  @Input() config?: Partial<OfflineIndicatorConfig>;

  isOnline = true;
  visible = false;

  private destroy$ = new Subject<void>();
  private autoHideTimer?: Subscription;

  constructor(
    private offlineService: NgxOfflineIndicatorService,
    private configService: NgxOfflineIndicatorConfigService
  ) {}

  ngOnInit(): void {
    // Apply custom configuration if provided
    if (this.config) {
      this.configService.setConfig(this.config);

      // Apply debounce time if set
      if (this.config.debounceTime !== undefined) {
        this.offlineService.setDebounceTime(this.config.debounceTime);
      }
    }

    // Subscribe to online/offline status changes
    this.offlineService.getOnlineStatus().pipe(
      takeUntil(this.destroy$)
    ).subscribe(isOnline => {
      this.isOnline = isOnline;

      // Always show when offline
      if (!isOnline) {
        this.visible = true;
        this.cancelAutoHideTimer();
      } else if (this.getConfig().showOnlineIndicator) {
        // Show "back online" message briefly
        this.visible = true;
        this.startAutoHideTimer();
      } else {
        // Hide immediately when online if showOnlineIndicator is false
        this.visible = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cancelAutoHideTimer();
  }

  /**
   * Get current configuration (combines defaults with any custom config)
   */
  getConfig(): OfflineIndicatorConfig {
    return this.configService.getConfig();
  }

  /**
   * Start timer to auto-hide the online indicator after specified duration
   */
  private startAutoHideTimer(): void {
    this.cancelAutoHideTimer();
    const duration = this.getConfig().onlineIndicatorDuration || 3000;

    this.autoHideTimer = timer(duration).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.visible = false;
    });
  }

  /**
   * Cancel any existing auto-hide timer
   */
  private cancelAutoHideTimer(): void {
    if (this.autoHideTimer) {
      this.autoHideTimer.unsubscribe();
      this.autoHideTimer = undefined;
    }
  }
}
