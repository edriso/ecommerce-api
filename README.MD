#E-commerce API

Welcome to E-commerce API! This application provides various endpoints for managing users, products, reviews, and orders within an e-commerce and online store environment.
Designed with simplicity, security, and efficiency in mind, this API invites you to explore its core functionalities that drive seamless e-commerce experiences!

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Documentation](#documentation)
  - [API Documentation](#api-documentation)
  - [Postman Documentation](#postman-documentation)

## Introduction

This Express.js application serves as the backend for an e-commerce platform, credits to John Smilga for the valuable insights and knowledge shared in his node.js course. The application allows users to register, log in, browse products, leave reviews, and create orders. The API is designed to be secure, scalable, and easy to use.

## Features

- User authentication and authorization.
- CRUD operations for users, products, reviews, and orders.
- File upload functionality for product images.
- Security measures, including rate limiting, helmet protection, and data sanitization.
- Error handling and logging for improved debugging.

## Installation

1. Clone the repository: `git clone https://github.com/edriso/ecommerce-api.git`
2. Install dependencies: `npm install`
3. Rename the `.env.example` file to `.env`.
4. Open the `.env` file and set the environment variables specified within.

## Usage

To start the server, run the following command:

```bash
npm start
```

The server will start on the specified port (or default to 5000 if not changed in the .env file).

## API Endpoints

- **Authentication:**

  - `POST /api/v1/auth/register` - Register a new user.
  - `POST /api/v1/auth/login` - User login.
  - `GET /api/v1/auth/logout` - User logout.

- **Users:**

  - `GET /api/v1/users` - Get all users (admin only).
  - `GET /api/v1/users/:id` - Get a single user by ID (admin only).
  - `PUT /api/v1/users/:id` - Update a user by ID (admin only).
  - `DELETE /api/v1/users/:id` - Delete a user by ID (admin only).

- **Products:**

  - `GET /api/v1/products` - Get all products.
  - `GET /api/v1/products/:id` - Get a single product by ID.
  - `POST /api/v1/products` - Create a new product (admin only).
  - `PUT /api/v1/products/:id` - Update a product by ID (admin only).
  - `DELETE /api/v1/products/:id` - Delete a product by ID (admin only).

- **Reviews:**

  - `GET /api/v1/reviews` - Get all reviews.
  - `GET /api/v1/reviews/:id` - Get a single review by ID.
  - `POST /api/v1/reviews` - Create a new review.
  - `PUT /api/v1/reviews/:id` - Update a review by ID.
  - `DELETE /api/v1/reviews/:id` - Delete a review by ID.

- **Orders:**
  - `GET /api/v1/orders` - Get all orders (admin only).
  - `GET /api/v1/orders/:id` - Get a single order by ID (admin only).
  - `POST /api/v1/orders` - Create a new order.
  - `PUT /api/v1/orders/:id` - Update an order by ID (admin only).
  - `DELETE /api/v1/orders/:id` - Delete an order by ID (admin only).

## Security

This API implements several security measures, including:

- **Rate Limiting:** Limits the number of requests a client can make within a specified time frame.
- **Helmet Protection:** Adds various HTTP headers to enhance security.
- **XSS Protection:** Sanitizes user input to prevent cross-site scripting attacks.
- **Data Sanitization:** Prevents NoSQL query injection by sanitizing user-supplied data.
- **CORS:** Enables Cross-Origin Resource Sharing to control which domains can access the API.

## Documentation

#### API Documentation

You can access the API documentation by visiting the root route of the application. The documentation provides detailed information about the API endpoints, request/response formats, and usage examples.

**How to View:** Simply open your web browser and go to the root route, for example, `http://localhost:5000`.

**Guidance:** Refer to this documentation for instructions on interacting with the API effectively and making the most of its features.

#### Postman Documentation

To enhance usability, the API endpoints have been documented in Postman.

You can find the collection in the `docs-postman.json` file. Import this collection into your Postman application to interactively explore the available endpoints.
