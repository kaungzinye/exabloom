# Workflow Builder Backend

The backend API service for the Workflow Builder, built with Node.js, Express, and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/workflow-builder
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── workflow.controller.ts
│   ├── models/
│   │   └── workflow.model.ts
│   ├── routes/
│   │   └── workflow.routes.ts
│   ├── services/
│   │   └── workflow.service.ts
│   ├── types/
│   │   └── workflow.types.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── config/
│   │   └── database.ts
│   └── app.ts
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## Available Scripts

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the TypeScript code
- `npm start`: Start the production server
- `npm run test`: Run tests
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## API Documentation

### Endpoints

#### Workflows

```typescript
// Get all workflows
GET /api/workflows

// Get a specific workflow
GET /api/workflows/:id

// Create a new workflow
POST /api/workflows
Body: {
  name: string;
  nodes: Node[];
  edges: Edge[];
}

// Update a workflow
PUT /api/workflows/:id
Body: {
  name?: string;
  nodes?: Node[];
  edges?: Edge[];
}

// Delete a workflow
DELETE /api/workflows/:id
```

### Data Models

#### Workflow

```typescript
interface Workflow {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

interface Node {
  id: string;
  type: 'start' | 'action' | 'ifElse' | 'branch' | 'end';
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}
```

## Development Guidelines

1. **Code Organization**
   - Follow the MVC pattern
   - Keep business logic in services
   - Use middleware for common functionality
   - Implement proper error handling

2. **Database**
   - Use MongoDB with Mongoose
   - Implement proper indexing
   - Handle connections properly

3. **API Design**
   - Follow RESTful principles
   - Implement proper validation
   - Use proper HTTP status codes
   - Include error messages

4. **Testing**
   - Write unit tests for services
   - Write integration tests for APIs
   - Maintain good test coverage

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/workflow-builder |
| NODE_ENV | Environment (development/production) | development |

## Error Handling

The API uses a centralized error handling mechanism:

```typescript
{
  status: number;
  message: string;
  errors?: any[];
}
```

## Security

- CORS configuration
- Rate limiting
- Input validation
- Error sanitization

## Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Start the server:
```bash
npm start
```

## Monitoring

The API includes basic monitoring endpoints:

```
GET /health
GET /metrics
```

## Troubleshooting

Common issues and solutions:

1. **Database Connection Issues**
   - Check MongoDB connection string
   - Verify network connectivity
   - Check MongoDB service status

2. **Performance Issues**
   - Check database indexes
   - Monitor query performance
   - Check server resources

3. **Type Errors**
   - Run `npm run type-check`
   - Update type definitions 