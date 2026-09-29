# ProfAkounda Frontend

A comprehensive educational platform that connects students and professionals with qualified trainers. ProfAkounda makes it easy to find, discover, and enroll in training courses from experienced educators.

**Slogan:** Trouvez votre formateur (Find your trainer)

## 🚀 Technology Stack

- **Frontend Framework:** [Angular](https://angular.io/) v9.1.13
- **Language:** TypeScript 3.8.3
- **Build Tool:** Angular CLI 9.1.15
- **UI Components:** Angular Material 8.2.3, Bootstrap 4.6.1, Material Design Bootstrap
- **Rich Text Editor:** CKEditor 5
- **Maps Integration:** AGM (Angular Google Maps)
- **PDF Generation:** PDFMake
- **Styling:** SCSS, CSS, Materialize CSS, Font Awesome
- **Testing:** Karma & Jasmine (unit tests), Protractor (e2e tests)

## 📋 Features

- **User Management:** Customer registration and profile management
- **Course Discovery:** Browse and search training courses
- **Admin Dashboard:** Manage courses, users, and platform content
- **Common Courses:** Shared courses accessible to multiple user types
- **Responsive Design:** Mobile-friendly interface across all devices
- **Google Maps Integration:** Location-based trainer discovery
- **PDF Export:** Generate and download course materials
- **Rich Content:** Text editor support for course descriptions

## 📦 Project Structure

```
src/
├── app/
│   ├── admin/              # Administrator dashboard and management
│   ├── customers/          # Customer-facing features
│   ├── formations/         # Course/training modules
│   ├── cours-commun/       # Shared courses
│   ├── home/               # Landing and home pages
│   ├── contact-us/         # Contact form and inquiries
│   ├── error-page/         # Error handling pages
│   ├── guard/              # Authentication guards
│   ├── API_url/            # API configuration
│   └── custom-validator/   # Custom form validators
├── assets/                 # Static assets (images, styles, fonts)
├── environments/           # Environment-specific configurations
└── index.html              # Main HTML entry point
```

## ⚙️ Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- Angular CLI (v9 or higher)

## 🔧 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd profakounda-frontend

# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm start

# Navigate to http://localhost:4200/
# The application will automatically reload when you make changes
```

### Build for Production

```bash
# Build the project for production
npm run build

# Build artifacts will be stored in the dist/ directory
# For optimized production build use:
npm run build -- --configuration production
```

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests via Karma
npm test

# Run tests with code coverage
npm test -- --code-coverage
```

### End-to-End Tests

```bash
# Run e2e tests via Protractor
npm run e2e
```

## 📝 Code Scaffolding

Generate new Angular components using Angular CLI:

```bash
# Generate a component
ng generate component component-name

# Generate other elements
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 🔍 Linting

```bash
# Check code quality with TSLint
npm run lint
```