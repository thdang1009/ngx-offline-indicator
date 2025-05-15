import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgxOfflineIndicatorComponent,
  OfflineIndicatorConfig,
  IndicatorType,
  IndicatorPosition,
  NgxOfflineIndicatorService
} from 'ngx-offline-indicator';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxOfflineIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-offline-indicator Demo';
  isOnline = navigator.onLine;
  simulatingOffline = false;
  showTestIndicator = false;
  eventLogs: string[] = [];
  maxLogEntries = 5;

  // Event subscriptions
  private statusSubscription?: Subscription;

  // For template access to enum values
  indicatorTypes = IndicatorType;
  indicatorPositions = IndicatorPosition;

  // Main configuration used by the indicator
  mainConfig: OfflineIndicatorConfig = {
    type: IndicatorType.BANNER,
    position: IndicatorPosition.TOP,
    theme: 'light',
    offlineText: 'You are offline. Some features may not be available.',
    onlineText: 'Your connection has been restored.',
    showIcons: true,
    showOnlineIndicator: true,
    onlineIndicatorDuration: 3000,
    zIndex: 1000
  };

  // Config for template binding - this is the one we modify in the UI
  config: OfflineIndicatorConfig = { ...this.mainConfig };

  // Test instance configuration
  testConfig: OfflineIndicatorConfig = {
    type: IndicatorType.FLOATING,
    position: IndicatorPosition.BOTTOM_RIGHT,
    theme: 'dark',
    offlineText: 'Test Indicator: Offline',
    onlineText: 'Test Indicator: Back Online',
    showIcons: true,
    showOnlineIndicator: true,
    onlineIndicatorDuration: 5000,
    zIndex: 1200
  };

  // Sample code to display in the documentation
  usageExample = `
// In your component
import { NgxOfflineIndicatorComponent, OfflineIndicatorConfig, IndicatorType, IndicatorPosition } from 'ngx-offline-indicator';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [NgxOfflineIndicatorComponent],
  template: \`
    <ngx-offline-indicator [config]="indicatorConfig"></ngx-offline-indicator>
  \`
})
export class YourComponent {
  indicatorConfig: OfflineIndicatorConfig = {
    type: IndicatorType.BANNER,
    position: IndicatorPosition.TOP,
    theme: 'light',
    offlineText: 'You are offline. Some features may not be available.',
    onlineText: 'Your connection has been restored.',
    showIcons: true,
    showOnlineIndicator: true,
    onlineIndicatorDuration: 3000,
    zIndex: 1000
  };
}`;

  eventListenerExample = `
// Subscribe to online/offline events
import { NgxOfflineIndicatorService } from 'ngx-offline-indicator';

constructor(private offlineService: NgxOfflineIndicatorService) {}

ngOnInit() {
  this.statusSubscription = this.offlineService.getOnlineStatus().subscribe(
    isOnline => {
      if (isOnline) {
        console.log('Back online - you can now retry failed requests');
        // Retry logic here
      } else {
        console.log('Connection lost - enable offline mode');
        // Offline mode logic here
      }
    }
  );
}

ngOnDestroy() {
  if (this.statusSubscription) {
    this.statusSubscription.unsubscribe();
  }
}`;

  constructor(private offlineService: NgxOfflineIndicatorService) {}

  ngOnInit() {
    // Native browser events
    window.addEventListener('online', this.handleNetworkChange.bind(this));
    window.addEventListener('offline', this.handleNetworkChange.bind(this));

    // Service subscription for more features
    this.statusSubscription = this.offlineService.getOnlineStatus().subscribe(
      isOnline => {
        this.addEventLog(`Service event: ${isOnline ? 'Online' : 'Offline'}`);

        // Update UI if not in simulation mode
        if (!this.simulatingOffline) {
          this.isOnline = isOnline;
        }

        // Demonstrate what you could do with the event
        if (isOnline) {
          this.addEventLog('You can now retry failed network requests');
        } else {
          this.addEventLog('Network is unavailable - switching to offline mode');
        }
      }
    );
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.handleNetworkChange.bind(this));
    window.removeEventListener('offline', this.handleNetworkChange.bind(this));

    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  handleNetworkChange() {
    if (!this.simulatingOffline) {
      this.isOnline = navigator.onLine;
      this.addEventLog(`Browser event: ${this.isOnline ? 'Online' : 'Offline'}`);
    }
  }

  toggleOfflineSimulation() {
    this.simulatingOffline = !this.simulatingOffline;
    this.isOnline = this.simulatingOffline ? false : navigator.onLine;
    this.addEventLog(`Simulation ${this.simulatingOffline ? 'started' : 'stopped'}`);

    // Manually trigger events for simulation purposes
    if (this.simulatingOffline) {
      // Dispatch offline browser event
      window.dispatchEvent(new Event('offline'));
    } else {
      // Dispatch online browser event
      window.dispatchEvent(new Event('online'));
    }
  }

  toggleTestIndicator() {
    this.showTestIndicator = !this.showTestIndicator;
    this.addEventLog(`Test indicator ${this.showTestIndicator ? 'shown' : 'hidden'}`);
  }

  // Methods to update configuration
  updateOfflineText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.config.offlineText = value;
    this.updateMainConfig();
  }

  updateOnlineText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.config.onlineText = value;
    this.updateMainConfig();
  }

  toggleShowIcons(event: Event): void {
    this.config.showIcons = (event.target as HTMLInputElement).checked;
    this.updateMainConfig();
  }

  toggleShowOnlineIndicator(event: Event): void {
    this.config.showOnlineIndicator = (event.target as HTMLInputElement).checked;
    this.updateMainConfig();
  }

  updateDuration(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (!isNaN(value) && value >= 0) {
      this.config.onlineIndicatorDuration = value;
      this.updateMainConfig();
    }
  }

  updateZIndex(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      this.config.zIndex = value;
      this.updateMainConfig();
    }
  }

  // Methods to update configuration settings
  setIndicatorType(type: IndicatorType): void {
    this.config.type = type;
    this.updateMainConfig();
  }

  setIndicatorPosition(position: IndicatorPosition): void {
    this.config.position = position;
    this.updateMainConfig();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.config.theme = theme;
    this.updateMainConfig();
  }

  // Update the main configuration from the UI config
  private updateMainConfig(): void {
    this.mainConfig = { ...this.config };
    this.addEventLog('Configuration updated');
  }

  // Manually trigger events for demonstration
  triggerOfflineEvent(): void {
    // Dispatch offline browser event
    window.dispatchEvent(new Event('offline'));
    this.isOnline = false;
    this.addEventLog('Manual offline event triggered');
    if (!this.simulatingOffline) {
      setTimeout(() => {
        // Dispatch online browser event
        window.dispatchEvent(new Event('online'));
        this.isOnline = true;
        this.addEventLog('Automatic recovery to online after 3s');
      }, 3000);
    }
  }

  triggerOnlineEvent(): void {
    // Dispatch online browser event
    window.dispatchEvent(new Event('online'));
    this.isOnline = true;
    this.addEventLog('Manual online event triggered');
  }

  private addEventLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLogs.unshift(`[${timestamp}] ${message}`);

    // Keep log size manageable
    if (this.eventLogs.length > this.maxLogEntries) {
      this.eventLogs.pop();
    }
  }

  clearEventLogs(): void {
    this.eventLogs = [];
  }
}
