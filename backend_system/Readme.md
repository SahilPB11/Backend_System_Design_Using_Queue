# Robust and Scalable Backend System with Queue-based Request Handling

This project showcases a scalable and efficient backend system designed to handle user requests through a queue-based architecture. Utilizing Node.js and robust technologies like RabbitMQ and PostgreSQL, the system ensures secure authentication, reliable request processing, and easy monitoring.

## 🚀 Features

- **Secure User Authentication:**
  - Leverages bcryptjs for robust password hashing, enhancing security.
  - Implements JWT (JSON Web Tokens) for secure user sessions and authorization.
- **Efficient Request Queueing:**
  - Employs RabbitMQ as a message broker, ensuring requests are queued and processed reliably even under high load.
  - Guarantees First-In-First-Out (FIFO) request processing, maintaining order and fairness.
- **Concurrent Request Handling:**
  - Utilizes worker processes to consume and process requests from the queue concurrently, enhancing throughput and responsiveness.
- **Persistent Data Storage:**
  - Integrates PostgreSQL as the database, providing reliable storage for user data and application state.
- **Real-time Monitoring and Insights:**
  - Incorporates Prometheus for collecting system metrics and performance data.
  - Provides a `/metrics` endpoint for easy integration with monitoring tools like Grafana, enabling visualization and analysis of system health.
- **Dockerized Deployment:**
  - Uses Docker to containerize the application, simplifying deployment and ensuring environment consistency.
  - Includes a `docker-compose.yaml` file for effortless setup and orchestration of the application, database, and message broker.

## 🛠️ Technologies Used

- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - PostgreSQL
- **Message Queue:**
  - RabbitMQ
- **Security:**
  - bcryptjs (for password hashing)
  - jsonwebtoken (JWT for authentication)
- **Monitoring:**
  - Prometheus
- **Containerization & Orchestration:**
  - Docker
  - Docker Compose

## 🔐 Authentication Flow

1.  **Registration:**
    - The user submits their username and password.
    - The password is hashed using bcryptjs before being stored securely in the database.
2.  **Login:**
    - The user provides their username and password.
    - The submitted password is hashed and compared against the stored hash for verification.
    - Upon successful authentication, a JWT is generated, signed with a secret key, and sent back to the client.
3.  **Request Authorization:**
    - For subsequent requests requiring authentication, the client includes the JWT in the request headers.
    - The server validates the JWT; if valid, the request is processed; otherwise, it's rejected.

## 🏗️ System Architecture

The system follows a microservice architecture with the following components:

1.  **Client:** Sends requests to the backend API.
2.  **API Server (Node.js/Express.js):**
    - Handles client requests.
    - Authenticates users.
    - Enqueues requests into RabbitMQ.
    - Exposes a `/metrics` endpoint for Prometheus.
3.  **RabbitMQ:** Acts as the message broker, managing request queues.
4.  **Worker Processes (Node.js):**
    - Retrieve requests from RabbitMQ queues.
    - Process the requests (e.g., database interactions, external API calls).
5.  **PostgreSQL:** Stores persistent user data.

## 🚀 Getting Started

1.  **Prerequisites:**

    - Install Docker and Docker Compose.
    - Install Node.js and npm.

2.  **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/queue-based-system.git
    cd queue-based-system
    ```

3.  **Configure Environment Variables:**

    - Create a `.env` file in the root directory.
    - Set the following environment variables:

    ```bash
    DATABASE_URL=postgres://user:password@postgres/mydb
    RABBITMQ_URL=amqp://rabbitmq:5672
    JWT_SECRET_KEY=your_strong_secret_key
    ```

4.  **Start the System:**

    ```bash
    docker-compose up -d
    ```

    This command will build and run the application, database, and RabbitMQ in Docker containers.

5.  **Access the Application:**

    - The API will be accessible at `http://localhost:3001`.
    - Prometheus metrics will be available at `http://localhost:9090`.

## 🤝 Contributions

Feel free to contribute to this project by submitting pull requests or raising issues.
