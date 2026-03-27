import "dotenv/config";
import Fastify from "fastify"; 
// CORS & Routes
import cors from "@fastify/cors";
import { registerusermodule } from "./modules/users/index.js";
import { registerCatalogModule } from "./modules/catalog/index.js";
import { registerShoppingModule } from "./modules/shopping/index.js";

const fastify = Fastify({
  logger: true,
});
//emit the event
const start = async () => {
  try {
    await fastify.register(cors, {
      origin: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    });

    //register user module
    await fastify.register(registerusermodule);
    await fastify.register(registerCatalogModule);
    await fastify.register(registerShoppingModule);

    await fastify.listen({ port: 9000, host: "0.0.0.0" });
    fastify.log.info(`Server is running at http://localhost:9000/api/v1/users/user`);
  } catch (err) {
    fastify.log.error(err); 
    process.exit(1);
  }
}

start();
