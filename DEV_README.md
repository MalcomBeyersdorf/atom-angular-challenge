# Development Instructions

## Prerequisites
- Node.js (v18+)
- Firebase CLI (`npm install -g firebase-tools`)
- Angular CLI (`npm install -g @angular/cli`)

## Setup
1. **Install Dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Backend Setup**
   - You need a Firebase project.
   - Run `firebase login` and `firebase init` if not already set up.
   - Or run locally with emulators:
     ```bash
     cd server
     npm run build
     npm run serve
     ```

## Running the App

### Backend (Cloud Functions)
To run local functions emulator:
```bash
cd server
npm run build
firebase emulators:start --only functions
```
*Note: Ensure the client points to the correct emulator port (usually 5001).*

### Frontend (Angular)
```bash
cd client
ng serve
```
Navigate to `http://localhost:4200`.

## Architecture
- **Client**: Angular 17 Standalone Components, Signal-based State, Material Design.
- **Server**: Express.js within Cloud Functions, DDD architecture.
