BACKEND

# Workflow Backend

A NestJS-based backend API for workflow management system with user authentication, workflow creation, validation, and management capabilities.

## Prerequisites

- **Node.js version 20** (Required)
- npm (comes with Node.js)
- PostgreSQL database

### Setting up Node.js 20

If you're using nvm (Node Version Manager):
```bash
nvm use 20
```

Or install Node.js 20 directly from [nodejs.org](https://nodejs.org/)

## Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # Authentication endpoints (login, register)
│   ├── auth.service.ts     # Authentication business logic
│   ├── auth.module.ts      # Authentication module configuration
│   ├── jwt-auth.guard.ts   # JWT authentication guard
│   ├── jwt.strategy.ts     # JWT strategy for Passport
│   ├── roles.decorator.ts  # Role-based access control decorator
│   └── roles.guard.ts      # Role-based access control guard
├── users/                  # User management module
│   └── user.model.ts       # User database model (Sequelize)
├── workflows/              # Workflow management module
│   ├── workflows.controller.ts  # Workflow CRUD endpoints
│   ├── workflows.service.ts     # Workflow business logic
│   ├── workflows.module.ts      # Workflow module configuration
│   ├── workflow.model.ts        # Workflow database model
│   └── dto.ts                   # Data Transfer Objects
├── app.module.ts           # Main application module
├── app.controller.ts       # Application root controller
├── app.service.ts          # Application root service
└── main.ts                 # Application entry point
```

## Key Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Workflow Management**: Create, read, update, delete workflows
- **Workflow Validation**: Validate workflow structure and connections
- **Role-Based Access Control**: User roles and permissions
- **Database Integration**: PostgreSQL with Sequelize ORM
- **API Documentation**: Swagger/OpenAPI documentation
- **TypeScript**: Full type safety throughout the application

## Installation

1. **Clone the repository** (if not already done)

2. **Navigate to the project directory**:
   ```bash
   cd workflow-backend
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

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=workflow_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Application Configuration
PORT=3001
NODE_ENV=development

# Optional: Enable database logging
DB_LOGGING=false
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL database host | `localhost` |
| `DB_PORT` | PostgreSQL database port | `5432` |
| `DB_USER` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `your_password` |
| `DB_NAME` | Database name | `workflow_db` |
| `JWT_SECRET` | Secret key for JWT token signing | `your_super_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `24h` |
| `PORT` | Application port | `3001` |

## Database Setup

### PostgreSQL Installation

1. **Install PostgreSQL**:
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/)

2. **Create database**:
   ```sql
   CREATE DATABASE workflow_db;
   CREATE USER your_db_username WITH PASSWORD 'your_db_password';
   GRANT ALL PRIVILEGES ON DATABASE workflow_db TO your_db_username;
   ```

3. **Database tables will be created automatically** when you start the application (thanks to Sequelize auto-sync).

## Running the Application Locally

### Development Mode

1. **Start the development server**:
   ```bash
   npm run start:dev
   ```

2. **The API will be available at**: [http://localhost:3001](http://localhost:3001)

3. **API Documentation (Swagger)**: [http://localhost:3001/api](http://localhost:3001/api)

### Production Mode

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm run start:prod
   ```

## Available Scripts

### `npm run start:dev`
Runs the app in development mode with hot reload

### `npm run start`
Runs the app in development mode

### `npm run start:prod`
Runs the built app in production mode

### `npm run build`
Builds the app for production

### `npm run test`
Runs unit tests

### `npm run test:e2e`
Runs end-to-end tests

### `npm run test:cov`
Runs tests with coverage report

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Workflows
- `GET /workflows` - Get all workflows for authenticated user
- `POST /workflows` - Create new workflow
- `PUT /workflows/:id` - Update workflow
- `DELETE /workflows/:id` - Delete workflow
- `POST /workflows/validate` - Validate workflow structure

## Database Choice: PostgreSQL

### Why PostgreSQL?

**PostgreSQL** was chosen as the database for this workflow management system for the following reasons:

1. **ACID Compliance**: Ensures data integrity for critical workflow data
2. **JSON Support**: Native JSON/JSONB support for storing flexible workflow node data
3. **Scalability**: Excellent performance for complex queries and large datasets
4. **Reliability**: Mature, stable database with strong community support
5. **Schema Flexibility**: Supports both structured data (users, workflows) and semi-structured data (workflow configurations)
6. **Advanced Features**: Support for transactions, foreign keys, and complex relationships

### Database Schema

- **Users Table**: Stores user authentication and profile information
- **Workflows Table**: Stores workflow metadata and JSON configuration data
- **Relationships**: Foreign key relationships between users and their workflows

## Development Assumptions

### Workflow Complexity
- Workflows are represented as JSON objects containing nodes and edges
- Each workflow belongs to a single user (no collaboration features in v1)
- Workflow validation ensures proper input/output node connections

### User Roles
- Single user role system (all authenticated users have same permissions)
- Future enhancement: Admin/User role separation
- JWT-based stateless authentication

### Security Assumptions
- Passwords are hashed using bcrypt with salt rounds
- JWT tokens expire after 24 hours (configurable)
- CORS enabled for frontend integration
- Input validation using class-validator

### Performance Assumptions
- Expected user base: Small to medium scale (< 10,000 users)
- Workflow complexity: Up to 100 nodes per workflow
- Database queries optimized for single-user workflow retrieval

### API Design
- RESTful API design principles
- JSON request/response format
- Error handling with appropriate HTTP status codes
- Swagger documentation for API exploration

## Troubleshooting

### Node Version Issues
```bash
nvm install 20
nvm use 20
```

### Database Connection Issues
1. Verify PostgreSQL is running
2. Check environment variables in `.env`
3. Ensure database exists and user has permissions

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Conflicts
Change the PORT in your `.env` file:
```env
PORT=3002
```

## Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Sequelize Documentation](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/)
--[Swagger Utl](http://localhost:<port>/api)[i.e:http://localhost:3001/api]

FRONTEND

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


