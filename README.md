# SAVEMEET - A Calendar App for Cost-Savvy Companies

![image](https://github.com/RevoU-FSSE-2/week-16-audiprevio/assets/126348614/9cffbb5f-a127-48f4-a2ea-d4614149f125)
<br>
<i> What the Savemeet front-end will look like (hopefully) </i>

## Tech Stack
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) 
<hr>

## About
SAVEMEET is a calendar application that helps you estimate the cost of your meetings based on the hourly rates of attendees. This README provides an overview of the project and how to set it up for your own use or contribute to its development.

### Use this Postman for extensive API Doc: https://documenter.getpostman.com/view/29021316/2s9YR56uhH

#### NOTICE: LIMITER & LOCKOUT IS ACTIVE THUS FAILED/ABUSE IN LOG IN WILL IMPACT YOUR ACCOUNT

<hr>

## Deployment
SAVEMEET is deployed using Railway.

<hr>

## Table of Contents

1\. [Prerequisites]

2\. [Installation]

3\. [Usage]

4\. [API Endpoints]

5\. [Contributing]

6\. [License]

## Prerequisites

Before getting started, ensure you have the following software installed:

- [Node.js](https://nodejs.org/)

- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

- [PostgreSQL](https://www.postgresql.org/)

## Installation

1\. Clone the repository:

```bash

git clone https://github.com/your-username/SAVEMEET.git

```

2\. Navigate to the project directory:

```bash

cd SAVEMEET

```

3\. Install the dependencies:

```bash

npm install

# or

yarn install

```

4\. Set up your environment variables by creating a `.env` file and filling it with the required values. You can use the `.env.example` file as a template.

5\. Set up your PostgreSQL database and update the database URL in your `.env` file.

6\. Run database migrations:

```bash

npx prisma migrate dev

# or

yarn prisma migrate dev

```

7\. Start the server:

```bash

npm start

# or

yarn start

```

The server will be running at `http://localhost:3000`.

## Usage

### API Endpoints

#### Authentication

- `/login` - User login with email and password

- `/register` - User registration

#### User Management

- `/request-password-reset` - Request a password reset token

- `/reset-password` - Reset the user's password

- `/logout` - Log out the user

#### Events and Attendees

- `/events` - Retrieve events (role-dependent)

- `/event` - Create a new event

- `/event/:id` - Update an event

- `/event/:id` - Delete an event

#### Payroll

- `/payroll` - Create a new payroll entry (admin or director only)

### Authorization

The API uses JWT tokens for authorization. To access protected routes, make sure you include the `access_token` in the request headers.

## Contributing

We welcome contributions to SAVEMEET. If you'd like to contribute, please follow these steps:

1\. Fork the repository.

2\. Create a new branch for your feature or bug fix.

3\. Make your changes and commit them.

4\. Push your branch to your fork and submit a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## Deeper Breakdown

### Controllers (mainController.ts)

User Login Function: Handles user login, checks credentials, validates the password, and generates JWT tokens for authentication.

User Registration Function: Manages user registration by creating a new user in the database with a hashed password.

Create Event Function: Creates new events, including attendees and payroll information, and calculates the total hourly rate.

Update Event Function: Updates event details, such as title, attendees, duration, and start time.

### Middlewares

#### AuthorizationMiddleware.ts

JWT Token Verification: Verifies JWT tokens for authentication and attaches the user to the request.

#### LimiterMiddleware.ts
Rate Limit Configuration: Sets rate limits for login requests based on IP address and email key.

#### LockoutMiddleware.ts

User Lockout Handling: Manages lockout behavior for users with multiple failed login attempts.

#### RoleCheckerMiddleware.ts

User Role Check: Checks the user's role and grants access based on roles like 'admin,' 'director,' or 'employee.'

### Schema.prisma

A simplified Prisma schema that defines the structure of the database, including models for users, events, attendees, and roles. It specifies the relationships between these entities and provides the basis for data storage and retrieval.

## Database Schema
<img width="940" alt="Screenshot 2023-10-14 at 02 06 25" src="https://github.com/RevoU-FSSE-2/week-16-audiprevio/assets/126348614/7c664fa0-9df4-43f9-8558-f700ea455d9d">

The provided code appears to be a Prisma schema, which is a declarative way to define your data models and their relationships for use with databases. Let's break down the schema you've provided:

1.  Generator Definition:

    prisma

    `generator client {
      provider = "prisma-client-js"
    }`

    This part specifies the code generator for Prisma, which generates a Prisma Client for you to interact with your database.

2.  Datasource Definition:

    prisma

    `datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }`

    This defines the data source, which connects your application to a PostgreSQL database using the URL provided in the `DATABASE_URL` environment variable.

3.  Data Models:

    a. User Model:

    -   Represents a user in your system.
    -   It has properties such as `id`, `name`, `email`, `password`, and `role`.
    -   Users can have many `attendees` (attendees in events they are part of) and a single optional `payroll`.
    -   Users can create many `events` (the events they've created).

    b. Event Model:

    -   Represents an event in your system.
    -   It has properties like `id`, `name`, `duration`, `startTime`, `endTime`, and `totalHourlyRate`.
    -   It's related to `User` as `createdBy` to indicate who created the event.
    -   Events can have many `attendees`.

    c. Attendee Model:

    -   Represents the link between `User` and `Event`.
    -   Each attendee is linked to a user (`User`) and an event (`Event`).

    d. Payroll Model:

    -   Represents the payroll information for a user.
    -   Contains properties like `id` and `hourlyRate`.
    -   Related to `User`.
4.  Enum:

    prisma

    `enum Role {
      employee
      admin
      director
    }`

    This defines an enumeration for roles, which users can have. The roles include 'employee,' 'admin,' and 'director.'

In summary, this Prisma schema defines the data structure for a system involving users, events, attendees, and payroll information, as well as the roles assigned to users. This schema can be used with Prisma to interact with a PostgreSQL database, and it provides a clear structure for defining the relationships between various entities in your application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to customize this README according to your project's specific needs and details. Make sure to include comprehensive information and update it as your project evolves.
