#!/bin/bash

# Build the library first (needed for the demo app)
npx ng build ngx-offline-indicator

# Build the demo app
npx ng build demo-app
