# ngx-offline-indicator Workspace

This is the development workspace for the `ngx-offline-indicator` Angular library.

## What is ngx-offline-indicator?

`ngx-offline-indicator` is an Angular library designed to provide developers with a simple and customizable way to inform users about their internet connection status within their Angular applications. This library improves the user experience by providing timely feedback when the application goes offline and offering mechanisms for handling offline scenarios.

## Features

- Automatic online/offline detection
- Multiple indicator types (banner, floating, status text)
- Customizable positioning and appearance
- Event hooks for online/offline state changes
- Minimal performance impact
- Easy integration with Angular applications

## Repository Structure

- **projects/ngx-offline-indicator/** - The library source code
- **dist/ngx-offline-indicator/** - The built library (after running build command)
- **PUBLISHING.md** - Detailed instructions for publishing to npm
- **USAGE.md** - Comprehensive usage guide and examples

## Development

### Building the library

```bash
npx ng build ngx-offline-indicator
```

### Publishing to npm

1. Build the library: `npx ng build ngx-offline-indicator`
2. Navigate to the dist folder: `cd dist/ngx-offline-indicator`
3. Publish to npm: `npm publish`

See **PUBLISHING.md** for detailed publishing instructions.

## Usage

For detailed usage examples and API documentation, see **USAGE.md**.

### Basic Usage

```typescript
import { NgxOfflineIndicatorComponent } from 'ngx-offline-indicator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxOfflineIndicatorComponent],
  template: `
    <ngx-offline-indicator></ngx-offline-indicator>
    <h1>My App</h1>
  `,
})
export class AppComponent {}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
