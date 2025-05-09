import { Injectable } from '@angular/core';
import {
  IndicatorPosition,
  IndicatorType,
  OfflineIndicatorConfig
} from './ngx-offline-indicator.models';

/**
 * Default configuration for the offline indicator
 */
export const DEFAULT_CONFIG: OfflineIndicatorConfig = {
  type: IndicatorType.BANNER,
  position: IndicatorPosition.TOP,
  offlineText: 'You are currently offline',
  onlineText: 'Back online',
  showOnlineIndicator: true,
  onlineIndicatorDuration: 3000,
  theme: 'light',
  autoRetry: false,
  debounceTime: 300,
  showIcons: true,
  zIndex: 1000
};

/**
 * Configuration service for the offline indicator
 */
@Injectable({
  providedIn: 'root'
})
export class NgxOfflineIndicatorConfigService {
  private config: OfflineIndicatorConfig;

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
  }

  /**
   * Set the configuration for the offline indicator
   * @param config OfflineIndicatorConfig
   */
  public setConfig(config: Partial<OfflineIndicatorConfig>): void {
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Update debounce time in service if provided
    if (config.debounceTime !== undefined) {
      // The NgxOfflineIndicatorService will handle this through DI
    }
  }

  /**
   * Get the current configuration
   * @returns OfflineIndicatorConfig
   */
  public getConfig(): OfflineIndicatorConfig {
    return { ...this.config };
  }
}
