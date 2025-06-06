# Polygon USDT Wallet Manager

A web application built with React and Flask that allows users to generate Polygon wallet addresses and check USDT balances on the Polygon network. The application stores wallet data and balance history in a PostgreSQL database.

## Features

- Generate new Polygon-compatible wallet addresses
- View and copy wallet addresses and private keys
- Check USDT balances for any Polygon address
- Track balance history for wallets
- Persistent storage using PostgreSQL
- Modern, responsive UI with Tailwind CSS

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn
- PostgreSQL database (or use the provided Render.com connection)

## Setup and Installation

### Database Setup

The application is configured to use a PostgreSQL database. The connection string is stored in the `.env` file in the backend directory. 

Default connection string format:
```
postgresql://username:password@hostname:port/database_name
```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```
   pip install -r ../requirements.txt
   ```

4. Run the Flask application:
   ```
   python app.py
   ```
   The backend will be available at http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Run the React application:
   ```
   npm start
   ```
   The frontend will be available at http://localhost:3000

## Database Schema

The application uses two main tables:

1. **wallets**: Stores generated wallet addresses and private keys
   - id (primary key)
   - address
   - private_key
   - created_at

2. **balance_checks**: Stores balance check history
   - id (primary key)
   - wallet_id (foreign key to wallets)
   - address
   - balance
   - checked_at

## API Endpoints

- `POST /api/generate-address`: Generates a new Polygon wallet address
- `POST /api/check-balance`: Checks the USDT balance for a given address
- `GET /api/wallets`: Retrieves all stored wallets
- `GET /api/balance-history/<address>`: Retrieves balance history for a specific address

## Technologies Used

- **Backend**: Flask, Web3.py, SQLAlchemy
- **Database**: PostgreSQL
- **Frontend**: React, Tailwind CSS, Axios
- **Blockchain**: Polygon Network, USDT Token

## Security Notice

This application is for demonstration purposes only. In a production environment:

- Never expose private keys to the backend or frontend
- Generate wallet addresses client-side using libraries like ethers.js or web3.js
- Use proper authentication and authorization
- Implement additional security measures for key management
- Use secure database connections with TLS/SSL

## License

MIT 