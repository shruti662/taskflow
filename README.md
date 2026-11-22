# TaskFlow – Personal Task Manager

TaskFlow is a full-stack **Task Management Application** designed to simplify everyday task organization and tracking. It allows users to create tasks, manage task descriptions, monitor completion status, and delete tasks through an interactive web interface.

Built using **React, TypeScript, Node.js, Express.js, and MySQL**, the application follows a client-server architecture with RESTful API integration for seamless frontend and backend communication.

## Features

- **Task Creation:** Add new tasks with titles and descriptions.
- **Task Listing:** Fetch and display all available tasks from the database.
- **Status Management:** Toggle tasks between **Pending** and **Completed** statuses.
- **Task Deletion:** Remove tasks that are no longer required.
- **RESTful API Integration:** Communicate between frontend and backend using HTTP requests.
- **Database Integration:** Store and retrieve task information using MySQL.
- **Input Validation:** Validate required task fields before inserting records.
- **Interactive UI:** Display task details and completion status through a clean interface.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, TypeScript |
| Backend | Node.js, Express.js, TypeScript |
| Database | MySQL |
| Database Connectivity | MySQL2 |
| API Communication | Axios, REST APIs |
| Styling | Tailwind CSS |
| Middleware | CORS, Express JSON Middleware |

## Project Architecture

The application follows a client-server architecture.

### Frontend
- Developed using React and TypeScript.
- Uses React Hooks (`useState` and `useEffect`) for state management and lifecycle operations.
- Uses Axios to communicate with backend REST APIs.
- Displays task information and provides controls for task creation, status updates, and deletion.

### Backend
- Developed using Node.js, Express.js, and TypeScript.
- Implements RESTful API endpoints for task management.
- Uses Express middleware for JSON request parsing and CORS configuration.
- Handles database operations and API responses.

### Database
- Uses MySQL for persistent task storage.
- Uses MySQL2 for database connectivity.
- Stores task identifiers, titles, descriptions, and completion statuses.

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PUT | `/api/tasks/:id/toggle` | Toggle task completion status |

### Example Task Object

```json
{
  "id": 1,
  "title": "Complete Project",
  "description": "Finish the TaskFlow application",
  "status": "pending"
}
```

## Database Structure

The application expects a MySQL database named `taskflow` with a `tasks` table.

Example SQL schema:

```sql
CREATE DATABASE taskflow;

USE taskflow;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending'
);
```

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL Server
- A code editor such as Visual Studio Code

### Installation and Setup

**1. Clone the repository**

```bash
git clone https://github.com/shruti662/taskflow.git
```

**2. Configure the database**

- Open MySQL Workbench or your preferred MySQL client.
- Create the `taskflow` database.
- Create the `tasks` table using the SQL schema provided above.

**3. Configure database connectivity**

Update the MySQL connection settings in `db.ts` to match your local database configuration.

For security, use environment variables for database credentials instead of storing passwords directly in source code.

**4. Configure and start the backend**

Install the required backend dependencies and start the Express server on port `5000`.

**5. Configure and start the frontend**

Install the frontend dependencies and start the React development server.

The frontend communicates with the backend through the REST API running at:

```text
http://localhost:5000/api/tasks
```

**Note:** The current repository does not include dependency manifests (`package.json`) or documented npm scripts. Add these files and the corresponding start commands so that other developers can reproduce the setup easily.

## Key Learning Outcomes

- Practical experience in **full-stack web application development**.
- Understanding of **React component development** and TypeScript.
- Implementation of **RESTful APIs** using Node.js and Express.js.
- Experience with **MySQL database integration** and SQL queries.
- Understanding of **client-server communication** using Axios.
- Implementation of **CRUD operations** and task status management.
- Experience handling asynchronous API requests and frontend state updates.

## Author

**Shruti Gadilkar**

M.Sc. Computer Science | University of Siegen, Germany

[GitHub Profile](https://github.com/shruti662)

---

⭐ Feel free to explore the repository!
