import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { specs } from "./services/swagger.js";
import routes from "./services/express.js";

const app = express();
const port = 3002;

// Parse JSON bodies for POST requests
app.use(bodyParser.json());

// Use routes
app.use("/api", routes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
