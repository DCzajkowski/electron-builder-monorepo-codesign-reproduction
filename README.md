# Reproduction of regression in electron-builder@26.3.1

The version 26.3.1 of electron-builder introduced a regression that causes the `app.asar.unpacked\node_modules` folder to contain the source folder of the app. This causes pulling entire source code into the production build (`C:\Users\<user>\AppData\Local\Programs\myapp\resources\app.asar.unpacked\node_modules\desktop-app`).

Instructions are for Windows, but I've observed the same issue on macOS.

## Reproduction

1. Clone this repository
2. Run `corepack enable`
3. Run `yarn install`
4. Run `yarn workspace desktop-app electron-builder`

### Expected behavior

The path `apps\desktop-app\dist\win-unpacked\resources\app.asar.unpacked\node_modules` should have only one folder `better-sqlite3-multiple-ciphers`.

### Actual behavior

The path `apps\desktop-app\dist\win-unpacked\resources\app.asar.unpacked\node_modules` has two folders `better-sqlite3-multiple-ciphers` and `desktop-app`.

## Fix

There are multiple factors that fix this issue (one of them is enough):
1. Downgrading to electron-builder@26.3.0
2. Removing
```
"extraMetadata": {
  "name": "myapp"
},
```
from `apps/desktop-app/package.json`.
