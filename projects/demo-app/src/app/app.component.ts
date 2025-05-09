import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxOfflineIndicatorComponent, OfflineIndicatorConfig, IndicatorType, IndicatorPosition } from 'ngx-offline-indicator';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxOfflineIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo-app';
  isOnline = navigator.onLine;
  simulatingOffline = false;
  showTestIndicator = false;

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
    showOnlineIndicator: true
  };
}`;

  ngOnInit() {
    window.addEventListener('online', this.handleNetworkChange.bind(this));
    window.addEventListener('offline', this.handleNetworkChange.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.handleNetworkChange.bind(this));
    window.removeEventListener('offline', this.handleNetworkChange.bind(this));
  }

  handleNetworkChange() {
    if (!this.simulatingOffline) {
      this.isOnline = navigator.onLine;
    }
  }

  toggleOfflineSimulation() {
    this.simulatingOffline = !this.simulatingOffline;
    this.isOnline = this.simulatingOffline ? false : navigator.onLine;
  }

  toggleTestIndicator() {
    this.showTestIndicator = !this.showTestIndicator;
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
  }
}
