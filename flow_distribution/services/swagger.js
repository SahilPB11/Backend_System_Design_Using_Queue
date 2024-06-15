import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flow Distribution API",
      version: "1.0.0",
      description: "API endpoints for flow distribution among astrologers",
    },
    servers: [
      {
        url: "http://localhost:3002",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
