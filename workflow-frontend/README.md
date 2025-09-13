# Workflow Frontend

A React-based workflow management application built with TypeScript, Shopify Polaris, and ReactFlow for creating and managing visual workflows.

## Prerequisites

- **Node.js version 20** (Required)
- npm (comes with Node.js)

### Setting up Node.js 20

If you're using nvm (Node Version Manager):
```bash
nvm use 20
```

Or install Node.js 20 directly from [nodejs.org](https://nodejs.org/)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── dropdown/       # Dropdown component with search and multi-select
│   ├── label/          # Label/Tag component with edit/remove functionality
│   ├── modal/          # Modal component with accessibility features
│   └── textinput/      # Text input component with validation
├── constant/           # Application constants and default values
├── pages/              # Page components
│   ├── dashboard/      # Main workflow editor page
│   ├── login/          # User authentication page
│   └── register/       # User registration page
├── state/              # State management (Auth context)
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Key Features

- **Visual Workflow Editor**: Drag-and-drop interface using ReactFlow
- **Node Management**: Create, edit, and delete workflow nodes
- **Workflow Validation**: Ensure workflows have proper input/output connections
- **User Authentication**: Login and registration system
- **Responsive Design**: Built with Shopify Polaris for consistent UI
- **TypeScript**: Full type safety throughout the application

## Installation

1. **Clone the repository** (if not already done)

2. **Navigate to the project directory**:
   ```bash
   cd workflow-frontend
   ```

3. **Ensure you're using Node.js 20**:
   ```bash
   nvm use 20
   # or
   node --version  # Should show v20.x.x
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application Locally

### Development Mode

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

3. The application will automatically reload when you make changes to the code.

### Environment Variables

Create a `.env` file in the root directory (optional):
```env
REACT_APP_API_URL=http://localhost:3001
```

## Available Scripts

### `npm start`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder with optimized bundles

### `npm run eject`
**Warning**: This is a one-way operation. Ejects from Create React App configuration.

## Component Library

The application includes custom-built components:

- **Dropdown**: Multi-select dropdown with search functionality
- **TextInput**: Enhanced input field with validation and icons
- **Label**: Interactive tags with edit/remove capabilities
- **Modal**: Accessible modal dialogs with keyboard navigation

## Backend Integration

This frontend connects to a Node.js backend API. Ensure the backend server is running on the configured API URL (default: `http://localhost:3001`).

## Development Workflow

1. **Create new components** in the `src/components/` directory
2. **Add pages** in the `src/pages/` directory
3. **Update constants** in `src/constant/index.ts`
4. **Follow TypeScript** best practices for type safety
5. **Use Shopify Polaris** components for consistent UI

## Troubleshooting

### Node Version Issues
If you encounter build errors, ensure you're using Node.js 20:
```bash
nvm install 20
nvm use 20
```

### Dependency Issues
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts
If port 3000 is in use, the app will prompt to use a different port or you can specify one:
```bash
PORT=3001 npm start
```

## Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Shopify Polaris](https://polaris.shopify.com/)
- [ReactFlow Documentation](https://reactflow.dev/)
