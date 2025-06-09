# Employee Management System

A full-stack Employee Management System using:

-  **Frontend**: React.js
-  **Backend**: Spring Boot (Java)
-  **Database**: MySQL
-  **Authentication**: JWT (JSON Web Tokens)

---

##  Features

- Register and login with JWT authentication
- Create, View, Edit and Delete employees
- Token-based API security
- CORS enabled to allow frontend-backend communication

---

##  Technologies Used

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React, Axios |
| Backend   | Spring Boot, Spring Security |
| Database  | MySQL              |
| Auth      | JWT                |

---

## Setup Instructions

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL Server running
- Git

---

### Backend Setup (Spring Boot)

1. Open terminal in the `ems/` folder.
2. Update `application.properties` with your MySQL credentials.
3. Create a MySQL database called `employeedb`.
4. Run the Spring Boot app:
   ```bash
   ./mvnw spring-boot:run
5. Or Run in IDE

---

### Frontend Setup (React)

1. Open terminal in the `emsFrontend/` folder.
2. Install dependencies:
   ```bash
   npm install
3. Start the React app:
   ```bash
   npm start

---

### JWT Authentication

1. On successful login, a JWT token is saved to localStorage.
2. This token is sent in the Authorization header for all secure API calls.
3. Token is validated in Spring Boot using Bearer <token> format.
