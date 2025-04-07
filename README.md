# Workflow Builder Application

A visual workflow builder application that allows users to create and manage workflows with different types of nodes (Start, Action, If/Else) and connections between them.

## Project Structure

This project consists of two main parts:
- `frontend/`: React application with the workflow builder interface
- `backend/`: Node.js backend API

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The frontend application will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The backend API will be available at `http://localhost:8000`

## Features

- Visual workflow builder with drag-and-drop interface
- Multiple node types:
  - Start Node: Beginning of the workflow
  - Action Node: Regular workflow steps
  - If/Else Node: Conditional branching with multiple paths
- Interactive connections between nodes
- Real-time workflow updates
- Automatic branch management for If/Else nodes

## Technologies Used

### Frontend
- React
- TypeScript
- React Flow
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 