# Game Store

A modern Angular application for browsing and purchasing video games, featuring a responsive design and shopping cart functionality.

## 🎮 Features

- **Game Catalog** - Browse available games with pricing and discount information
- **Featured Game Banner** - Highlighted promotional content on the home page
- **Shopping Cart** - Add games to cart with persistent storage
- **Ownership Tracking** - Visual indicators for games you already own
- **Responsive Design** - Optimized for desktop and mobile devices
- **Accessibility** - ARIA labels and keyboard navigation support
- **Error Handling** - Graceful degradation with loading states

## 🛠️ Tech Stack

- **Angular 20** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **@ngrx/signals** - Reactive state management
- **RxJS** - Reactive programming for data streams
- **SCSS** - Modular styling with variables and mixins
- **Jest** - Fast and reliable testing framework
- **Zoneless** - Modern Angular change detection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jaruszewskiG/game-store.git
   cd game-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 💻 Running the Application

### Development Server

Start the development server with hot reload:

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Production Build

Create an optimized production build:

```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

### Run All Tests

Execute the complete test suite:

```bash
npm test
```

### Run Tests with Coverage

Generate a code coverage report:

```bash
npm test -- --coverage
```

Coverage reports will be available in the `coverage/` directory.

### Test Statistics

- **40 tests** across 14 test suites
- **80%+ code coverage** (statements and lines)
- All tests use Jest with Angular testing utilities

## 📁 Project Structure

```
src/
├── app/
│   ├── components/        # Reusable UI components (buttons, tags)
│   ├── features/          # Feature modules
│   │   ├── cart/          # Shopping cart functionality
│   │   ├── games/         # Game catalog components
│   │   └── layout/        # Layout components (menu, navigation)
│   ├── models/            # TypeScript interfaces and types
│   ├── services/          # Business logic and API services
│   ├── stores/            # NgRx signals state management
│   ├── views/             # Page-level components
│   └── app.ts             # Root component
├── assets/                # Static files (images, icons)
└── styles.scss            # Global styles
```

## 🏗️ Architecture Highlights

### State Management

- Uses **@ngrx/signals** for reactive state management
- Cart state persists to localStorage
- Computed signals for derived state (totals, validations)

### Change Detection

- **Zoneless change detection** for optimal performance
- `OnPush` strategy on all components
- Signals for reactive updates

### Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support (Escape key to close dropdowns)
- Screen reader-friendly status messages

### Error Handling

- Graceful degradation when data fails to load
- Simulated network errors for testing resilient UI
- Loading states with skeleton screens

## 🎨 Key Components

- **GameListComponent** - Displays game catalog with filtering
- **GameListItemComponent** - Individual game card with add-to-cart
- **CartComponent** - Shopping cart dropdown with totals
- **FeaturedGameComponent** - Promotional banner
- **CartStore** - Global cart state with persistence
- **GamesService** - Mock game data and API simulation

## 🔧 Configuration

### Path Aliases

The project uses TypeScript path aliases for clean imports:

- `@app/*` - Application root
- `@services/*` - Services
- `@features/*` - Feature modules
- `@stores/*` - State stores
- `@shared/*` - Shared components
- `@models/*` - Type definitions
- `@views/*` - Page components

### Environment

The app simulates backend API calls with:

- 500ms delay (configurable in `games.service.ts`)
- Random error scenarios for testing error states
- Image assets in `assets/`

## 📝 Development Notes

### Modifying Game Data

The game data is currently mocked in the services. To modify:

- Edit `games.service.ts` to adjust mock game data
- Update delay timing and error simulation as needed

### Styling

Global styles are in `src/styles.scss`

## Author

**Grzegorz Jaruszewski**

- GitHub: [@jaruszewskiG](https://github.com/jaruszewskiG)

---

_Generated with Angular CLI version 20.3.5_
