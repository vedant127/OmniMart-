import Fastify from "fastify"; 
import userRoutes from "./routes/user.routes.js";
import * as userrepositories from "./repositories/user.repositories.js";
import userService from "./services/user.services.js";
import userController from "./controller/user.controller.js";

const fastify = Fastify({
  logger: true,
});

// Wire up dependency injection
const service = userService(userrepositories);
const controller = userController(service);

// Register the userRoutes with a prefix
fastify.register(userRoutes, {
  prefix: "/api/v1/users",
  userController: controller,
});

//emit the event
const start = async () => {
  try {
    await fastify.listen({ port: 9000, host: "0.0.0.0" });
    fastify.log.info(`Server is running at http://localhost:9000/api/v1/users/user`);
  } catch (err) {
    fastify.log.error(err); 
    process.exit(1);
  }
}

start();
