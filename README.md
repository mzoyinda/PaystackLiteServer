## Paystack Lite Server

Paystack Lite Server is a lightweight Node.js backend for handling Paystack payment processing, including payment initialization and verification.

### Features

- Initialize payments using Paystack API

- Verify payments and retrieve transaction details

- Store payment records in MongoDB

- RESTful API architecture

- Secure environment variables with dotenv

### Technologies Used

- Node.js

- Express.js

- MongoDB & Mongoose

- Paystack API

- Axios

- dotenv

### Getting Started

```Pre-requisites``` : Ensure you have the following installed:

- Node.js (v18+ recommended)

- MongoDB (Local or Cloud)

### Installation

- Clone the repository:

```
git clone https://github.com/your-username/paystack-lite-server.git
cd paystack-lite-server
```

- Install dependencies: ``` npm install ```

- Create a ```.env``` file in the config folder and add the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```

- Start the server: ```npm start```

### API Endpoints

- Payment Initialization

Endpoint: POST /api/v1/payments/initialize

Request Body:
```
{
  "amount": 5000,
  "email": "user@example.com",
  "full_name": "John Doe"
}
```
Response:
```
{
  "status": "Success",
  "data": {
    "authorization_url": "https://paystack.com/pay/xyz",
    "reference": "paystack_ref"
  }
}
```
- Verify Payment

Endpoint: GET /api/v1/payments/:reference

Response:
```
{
  "status": "Success",
  "data": {
    "reference": "paystack_ref",
    "amount": 5000,
    "status": "success"
  }
}
```
### GitHub Actions Workflow

- This project includes a GitHub workflow for CI/CD:

- Runs on push or pull_request to main branch

- Installs dependencies and verifies build

- Triggers deployment to Render

### Deployment

This project is deployed on Render using GitHub Actions.


### License

This project is licensed under the MIT License.

### Author

Oyin Dawodu
