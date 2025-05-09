/**
 * Position options for the offline indicator
 */
export enum IndicatorPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right'
}

/**
 * Type of indicator to display
 */
export enum IndicatorType {
  BANNER = 'banner',
  FLOATING = 'floating',
  STATUS_TEXT = 'status-text'
}

/**
 * Configuration for the offline indicator
 */
export interface OfflineIndicatorConfig {
  /**
   * The type of indicator to display
   * @default IndicatorType.BANNER
   */
  type?: IndicatorType;

  /**
   * Position of the indicator
   * @default IndicatorPosition.TOP
   */
  position?: IndicatorPosition;

  /**
   * Text to display when offline
   * @default 'You are currently offline'
   */
  offlineText?: string;

  /**
   * Text to display when online
   * @default 'Back online'
   */
  onlineText?: string;

  /**
   * Whether to show the indicator when the app comes back online
   * @default true
   */
  showOnlineIndicator?: boolean;

  /**
   * How long to show the online indicator before hiding it (in milliseconds)
   * @default 3000
   */
  onlineIndicatorDuration?: number;

  /**
   * Custom CSS class for the indicator
   */
  cssClass?: string;

  /**
   * Theme for the indicator ('light' or 'dark')
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Whether to automatically retry failed requests when coming back online
   * @default false
   */
  autoRetry?: boolean;

  /**
   * Debounce time in milliseconds for connection status changes
   * @default 300
   */
  debounceTime?: number;

  /**
   * Whether to use icons in the indicator
   * @default true
   */
  showIcons?: boolean;

  /**
   * Z-index of the indicator
   * @default 1000
   */
  zIndex?: number;
}
