# ngx-offline-indicator Usage Guide

This guide provides examples and best practices for using the ngx-offline-indicator library in your Angular applications.

## Installation

Install the library from npm:

```bash
npm install ngx-offline-indicator --save
```

## Basic Usage

### Standalone Components (Angular 14+)

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxOfflineIndicatorComponent } from 'ngx-offline-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxOfflineIndicatorComponent],
  template: `
    <ngx-offline-indicator></ngx-offline-indicator>
    <main>
      <h1>My App</h1>
      <!-- Your app content here -->
    </main>
  `
})
export class AppComponent {}
```

### Module-Based Applications

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxOfflineIndicatorModule } from 'ngx-offline-indicator';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxOfflineIndicatorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-offline-indicator></ngx-offline-indicator>
    <main>
      <h1>My App</h1>
      <!-- Your app content here -->
    </main>
  `
})
export class AppComponent {}
```

## Configuration Examples

### Banner at the Top

```html
<ngx-offline-indicator [config]="{
  type: 'banner',
  position: 'top',
  offlineText: 'Internet connection lost',
  theme: 'light'
}"></ngx-offline-indicator>
```

### Floating Indicator in Bottom-Right Corner

```html
<ngx-offline-indicator [config]="{
  type: 'floating',
  position: 'bottom-right',
  offlineText: 'You are offline',
  onlineText: 'Connected',
  theme: 'dark'
}"></ngx-offline-indicator>
```

### Status Text Only

```html
<ngx-offline-indicator [config]="{
  type: 'status-text',
  position: 'top-right',
  showIcons: false
}"></ngx-offline-indicator>
```

### Custom Styling

```html
<ngx-offline-indicator [config]="{
  cssClass: 'my-custom-indicator',
  zIndex: 2000
}"></ngx-offline-indicator>
```

Add your custom CSS:

```css
.my-custom-indicator .ngx-offline-indicator__content {
  background-color: #8a2be2;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Global Configuration with forRoot

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxOfflineIndicatorModule } from 'ngx-offline-indicator';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxOfflineIndicatorModule.forRoot({
      type: 'banner',
      position: 'top',
      offlineText: 'No internet connection',
      onlineText: 'Connected',
      theme: 'dark',
      debounceTime: 500,
      onlineIndicatorDuration: 5000
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Programmatic Access

You can inject and use the service directly for more control:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxOfflineIndicatorService } from 'ngx-offline-indicator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-component',
  template: `
    <div>Connection status: {{ isOnline ? 'Online' : 'Offline' }}</div>
    <button [disabled]="!isOnline">Send Data</button>
  `
})
export class MyComponent implements OnInit, OnDestroy {
  isOnline = true;
  private subscription: Subscription;

  constructor(private offlineService: NgxOfflineIndicatorService) {}

  ngOnInit(): void {
    // Get current status
    this.isOnline = this.offlineService.isOnline();
    
    // Subscribe to status changes
    this.subscription = this.offlineService.getOnlineStatus().subscribe(
      online => {
        this.isOnline = online;
        if (!online) {
          // Handle offline state
          console.log('Connection lost, pausing background sync');
        } else {
          // Handle online state
          console.log('Connection restored, resuming operations');
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

## Testing the Offline State

For development and testing, you can simulate an offline state using:

1. Chrome DevTools:
   - Open DevTools (F12)
   - Go to Network tab
   - Check "Offline" checkbox

2. Mobile device testing:
   - Enable airplane mode
   - Disable Wi-Fi and mobile data

## Best Practices

1. Place the component at the top level of your application (app.component.html)
2. Consider using the offline service to gracefully handle network-dependent operations
3. For PWAs, consider combining with service workers for true offline functionality
4. Customize the appearance to match your app's design language

## Advanced Usage with HTTP Interceptor

You can create an HTTP interceptor to automatically handle failed requests when offline:

```typescript
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxOfflineIndicatorService } from 'ngx-offline-indicator';

@Injectable()
export class OfflineInterceptor implements HttpInterceptor {
  constructor(private offlineService: NgxOfflineIndicatorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this.offlineService.isOnline()) {
          // Handle offline error differently
          console.log('Request failed due to being offline:', request.url);
          // You could queue the request for retry when back online
        }
        return throwError(error);
      })
    );
  }
}
```

Register the interceptor in your app module:

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OfflineInterceptor } from './offline.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OfflineInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
``` 
