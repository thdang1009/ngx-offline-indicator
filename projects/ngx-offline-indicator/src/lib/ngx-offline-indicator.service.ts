import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, merge, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Service for detecting and monitoring online/offline status
 */
@Injectable({
  providedIn: 'root'
})
export class NgxOfflineIndicatorService {
  private isOnline$ = new BehaviorSubject<boolean>(navigator.onLine);

  /**
   * Default debounce time in milliseconds for connection status changes
   */
  private debounceTimeMs = 300;

  constructor(private zone: NgZone) {
    this.setupConnectionListeners();
  }

  /**
   * Get an observable of the current online status
   * @returns Observable<boolean> - true if online, false if offline
   */
  public getOnlineStatus(): Observable<boolean> {
    return this.isOnline$.asObservable();
  }

  /**
   * Get the current online status value
   * @returns boolean - true if online, false if offline
   */
  public isOnline(): boolean {
    return this.isOnline$.getValue();
  }

  /**
   * Update debounce time for connection status changes
   * @param timeMs debounce time in milliseconds
   */
  public setDebounceTime(timeMs: number): void {
    if (timeMs >= 0) {
      this.debounceTimeMs = timeMs;
      // Re-setup listeners with new debounce time
      this.setupConnectionListeners();
    }
  }

  /**
   * Set up the connection status event listeners
   */
  private setupConnectionListeners(): void {
    // Run in the Angular zone to ensure change detection
    this.zone.runOutsideAngular(() => {
      // Initial connection status
      this.isOnline$.next(navigator.onLine);

      // Create merged observable from online and offline events
      merge(
        fromEvent(window, 'online').pipe(map(() => true)),
        fromEvent(window, 'offline').pipe(map(() => false))
      ).pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged()
      ).subscribe(online => {
        // Run inside Angular zone to trigger change detection
        this.zone.run(() => {
          this.isOnline$.next(online);
        });
      });
    });
  }
}
