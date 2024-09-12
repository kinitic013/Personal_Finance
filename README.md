# Personal Finance Backend

## Local Installation and Running Guide

Follow these steps to set up and run the personal finance backend on your local machine.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14.x or later)
- npm (Comes with Node.js)
- MongoDB (Ensure you have MongoDB running locally or use MongoDB Atlas)

### Step 1: Clone the Repository

Clone the project to your local machine using the following command:

```bash
git clone https://github.com/your-username/personal-finance-backend.git
cd personal-finance-backend
```

### Step 2: Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

This will install the required packages listed in the `package.json` file.

Replace `your_local_mongodb_uri_or_atlas_uri` with your local MongoDB URI (e.g., `mongodb://localhost:27017/personal_finance`) or a connection string from MongoDB Atlas

Set the `PORT` to the port number you want the backend to run on (optional; defaults to 5000).

### Step 3: Start MongoDB (If Running Locally)

Ensure MongoDB is running on your local machine:

- On Linux or macOS, run:
  ```bash
  sudo service mongod start
  ```
- On Windows, start the MongoDB service from the MongoDB server installation.

### Step 4: Running the Application

To run the application in development mode (with hot-reloading using nodemon), use the following command:

```bash
npm run dev
```

Or, to run it normally without nodemon:

```bash
npm start
```

The backend will now be running at `http://localhost:5000` and Swagger UI is running as `http://localhost:5000/api-docs/` and Postman Collection Link `https://www.postman.com/satellite-geoscientist-91060201/workspace/personal-finance-public/collection/26503391-053483b7-bbae-45e8-9980-772da3f8a26f?action=share&creator=26503391`
