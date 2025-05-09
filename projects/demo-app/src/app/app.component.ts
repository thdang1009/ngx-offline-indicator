import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import {
  NgxOfflineIndicatorComponent,
  NgxOfflineIndicatorService,
  IndicatorType,
  IndicatorPosition,
  OfflineIndicatorConfig
} from 'ngx-offline-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    NgxOfflineIndicatorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-offline-indicator Demo';
  isOnline = true;

  // Make enum values available to template
  indicatorTypes = IndicatorType;
  indicatorPositions = IndicatorPosition;

  // Configuration for the main indicator
  config: OfflineIndicatorConfig = {
    type: IndicatorType.BANNER,
    position: IndicatorPosition.TOP,
    offlineText: 'You are currently offline. Some features may not work.',
    onlineText: 'Connection restored!',
    theme: 'light',
    showIcons: true,
    showOnlineIndicator: true,
    onlineIndicatorDuration: 3000,
    zIndex: 1000
  };

  // Configuration for the test indicator
  testConfig: OfflineIndicatorConfig = { ...this.config };
  showTestIndicator = false;
  simulatingOffline = false;

  private subscription?: Subscription;

  // Sample usage code for display
  usageExample = `
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxOfflineIndicatorComponent, IndicatorType, IndicatorPosition } from 'ngx-offline-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxOfflineIndicatorComponent],
  template: \`
    <ngx-offline-indicator [config]="{
      type: IndicatorType.BANNER,
      position: IndicatorPosition.TOP,
      offlineText: 'You are currently offline',
      theme: 'light'
    }"></ngx-offline-indicator>

    <main>
      <!-- Your app content here -->
    </main>
  \`
})
export class AppComponent {
  // Make enum values available to template
  IndicatorType = IndicatorType;
  IndicatorPosition = IndicatorPosition;
}`;

  constructor(private offlineService: NgxOfflineIndicatorService) {}

  ngOnInit(): void {
    // Subscribe to network status changes
    this.subscription = this.offlineService.getOnlineStatus().subscribe(
      isOnline => {
        this.isOnline = isOnline;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Apply the custom configuration to the test indicator
  applyConfig(): void {
    this.testConfig = { ...this.config };
    this.showTestIndicator = true;
  }

  // Toggle offline simulation
  toggleOfflineSimulation(): void {
    this.simulatingOffline = !this.simulatingOffline;

    // In a real app, you'd use service workers or other methods to simulate offline
    // Here we're just toggling a visual change for demo purposes
    if (this.simulatingOffline) {
      // This doesn't actually change the browser's online status,
      // but demonstrates what the component would show
      this.isOnline = false;
    } else {
      this.isOnline = navigator.onLine;
    }
  }
}
