Expense Tracker - Track your expenses

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd ExpenseTracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables:
   - Navigate to the `backend` folder
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your actual values:
     - `MONGO_URI`: Your MongoDB connection string
     - `PORT`: Backend server port (default: 5000)
     - `JWT_SECRET`: A secure secret key for JWT authentication

5. Run the backend server:
```bash
cd backend
npm run dev
```

6. Run the frontend (in a separate terminal):
```bash
cd frontend
npm run dev
```
