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

## Deploying to Vercel

To deploy the demo app to Vercel, follow these steps:

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Make sure you're in the project root directory:
   ```
   cd ngx-offline-indicator-workspace
   ```

3. Login to Vercel:
   ```
   vercel login
   ```

4. Deploy the app:
   ```
   vercel
   ```

5. Follow the prompts from the Vercel CLI:
   - Set up and deploy project? `Yes`
   - Which scope to deploy to? `[Select your account]`
   - Link to existing project? `No`
   - Project name: `[Enter a name or accept the default]`
   - Directory to deploy: `./`
   - Override settings? `No`

6. Once deployed, Vercel will provide a URL to access your demo app.

7. For production deployment:
   ```
   vercel --prod
   ```

### Troubleshooting Deployment

If you encounter build issues during deployment:

1. The deployment uses a custom build script (`vercel-build.js`) to:
   - First build the library (`ngx-offline-indicator`)
   - Then build the demo app that depends on the library

2. If you see errors about missing dependencies, try adding them to the root `package.json`.

3. For path resolution issues, check the `paths` configuration in `projects/demo-app/tsconfig.app.json`.
