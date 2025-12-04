# Payslips App

Payslip viewer with download functionality.

## Prerequisites

- Node 18+
- npm
- Xcode/Android Studio

## Setup

npm install

## Run

npx react-native start
npx react-native run-ios
npx react-native run-android

## Test

npm test

## Stack

- React Native CLI 0.82
- React Navigation (Stack)
- Zustand (state)
- react-native-fs (file handling)

## Architecture

Clean separation: screens, navigation, store, services, utils, types.
State managed with Zustand for simplicity. Native file operations via react-native-fs with Android permission handling. PDF preview via native viewer using Linking API.

## Limitations

- Single PDF reused across all payslips

## Future Improvements

- Backend API integration
- Advanced filtering by text
