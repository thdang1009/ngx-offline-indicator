# NgxOfflineIndicator

A lightweight, customizable Angular library for displaying online/offline status indicators in your application.

[![npm version](https://badge.fury.io/js/ngx-offline-indicator.svg)](https://badge.fury.io/js/ngx-offline-indicator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Automatic online/offline detection
- Multiple indicator types (banner, floating, status text)
- Customizable positioning
- Configurable styling and theming
- Event hooks for online/offline state changes
- Accessibility-friendly design
- Minimal performance impact
- Easy integration with Angular applications

## Demo

[https://ngx-offline-indicator.vercel.app/](https://ngx-offline-indicator.vercel.app/)

## Installation

```bash
npm install ngx-offline-indicator --save
```

## Basic Usage

### 1. Import the module in your Angular app

#### For standalone components:

```typescript
import { NgxOfflineIndicatorComponent } from 'ngx-offline-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxOfflineIndicatorComponent],
  template: `
    <ngx-offline-indicator></ngx-offline-indicator>
    <h1>My App</h1>
    <!-- rest of your app -->
  `,
})
export class AppComponent {}
```

#### For module-based applications:

```typescript
import { NgxOfflineIndicatorModule } from 'ngx-offline-indicator';

@NgModule({
  imports: [
    BrowserModule,
    NgxOfflineIndicatorModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Add the component to your template

```html
<ngx-offline-indicator></ngx-offline-indicator>
```

That's it! The indicator will automatically display when the user is offline and hide when they're back online.

## Configuration

You can customize the indicator's appearance and behavior by providing configuration options:

### Via component inputs

```html
<ngx-offline-indicator [config]="{
  type: 'banner',
  position: 'top',
  offlineText: 'No internet connection',
  onlineText: 'Connection restored',
  theme: 'dark'
}"></ngx-offline-indicator>
```

### Via the module for global configuration

```typescript
import { NgxOfflineIndicatorModule } from 'ngx-offline-indicator';

@NgModule({
  imports: [
    BrowserModule,
    NgxOfflineIndicatorModule.forRoot({
      type: 'banner',
      position: 'top',
      offlineText: 'No internet connection',
      onlineText: 'Connection restored',
      theme: 'dark'
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | 'banner' \| 'floating' \| 'status-text' | 'banner' | The type of indicator to display |
| `position` | 'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'top' | Position of the indicator on the screen |
| `offlineText` | string | 'You are currently offline' | Text to display when offline |
| `onlineText` | string | 'Back online' | Text to display when coming back online |
| `showOnlineIndicator` | boolean | true | Whether to show the indicator when coming back online |
| `onlineIndicatorDuration` | number | 3000 | How long to show the online indicator before hiding (ms) |
| `cssClass` | string | '' | Additional CSS class(es) for the indicator |
| `theme` | 'light' \| 'dark' | 'light' | Color theme of the indicator |
| `autoRetry` | boolean | false | Whether to auto-retry failed requests when coming back online |
| `debounceTime` | number | 300 | Debounce time for connection status changes (ms) |
| `showIcons` | boolean | true | Whether to show icons in the indicator |
| `zIndex` | number | 1000 | Z-index of the indicator |

## Advanced Usage

### Accessing the service directly

You can inject the `NgxOfflineIndicatorService` to get online/offline status programmatically:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxOfflineIndicatorService } from 'ngx-offline-indicator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-component',
  template: `
    <div *ngIf="isOnline">Online content</div>
    <div *ngIf="!isOnline">Offline content</div>
  `
})
export class MyComponent implements OnInit, OnDestroy {
  isOnline = true;
  private subscription: Subscription;

  constructor(private offlineService: NgxOfflineIndicatorService) {}

  ngOnInit(): void {
    this.subscription = this.offlineService.getOnlineStatus().subscribe(
      online => {
        this.isOnline = online;
        if (!online) {
          console.log('Network connection lost!');
        } else {
          console.log('Network connection restored!');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
```

### Using custom templates (advanced)

For more advanced customization, you can override the styles using CSS variables or by targeting the component's CSS classes.

## Browser Compatibility

This library is compatible with all modern browsers that implement the [Navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) API.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
