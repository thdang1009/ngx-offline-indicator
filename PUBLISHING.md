# Publishing Guide for ngx-offline-indicator

This guide outlines the steps to publish the ngx-offline-indicator library to npm.

## Prerequisites

1. You need an npm account. If you don't have one, create it at [npmjs.com](https://www.npmjs.com/signup).
2. You need to be logged in to npm in your terminal. Use `npm login` to authenticate.

## Publication Steps

### 1. Build the library

```bash
npx ng build ngx-offline-indicator
```

This will create the distribution files in the `dist/ngx-offline-indicator` directory.

### 2. Navigate to the distribution directory

```bash
cd dist/ngx-offline-indicator
```

### 3. Update package information (if needed)

Before publishing, you might want to update:
- The version number in package.json
- Author information
- Repository links

### 4. Publish to npm

For the first publication:

```bash
npm publish
```

For subsequent updates:

```bash
npm publish
```

### 5. Publishing with specific tag

If you want to publish a beta or test version:

```bash
npm publish --tag beta
```

## Versioning Guidelines

Follow [Semantic Versioning](https://semver.org/) (semver) principles:

- **MAJOR version** when you make incompatible API changes
- **MINOR version** when you add functionality in a backward compatible manner
- **PATCH version** when you make backward compatible bug fixes

Example version bumping:

```bash
# For a patch update (bug fixes)
npm version patch

# For a minor update (new features, backward compatible)
npm version minor

# For a major update (breaking changes)
npm version major
```

## Post-Publication

After publishing, verify your package is available at:
https://www.npmjs.com/package/ngx-offline-indicator

## Unpublishing

If you need to unpublish a package (within 72 hours of publication):

```bash
npm unpublish ngx-offline-indicator@1.0.0
```

Note: npm has restrictions on unpublishing packages. You can only unpublish within 72 hours of publication, unless there are special circumstances. 
