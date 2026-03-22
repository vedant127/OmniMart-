import Fastify from "fastify"; 
import { registerusermodule } from "./modules/users/index.js";

const fastify = Fastify({
  logger: true,
});


//emit the event
const start = async () => {
  try {

    //register user module
    await registerusermodule(fastify);

    //await registercatalogmodule(fastify);

    await fastify.listen({ port: 9000, host: "0.0.0.0" });
    fastify.log.info(`Server is running at http://localhost:9000/api/v1/users/user`);
  } catch (err) {
    fastify.log.error(err); 
    process.exit(1);
  }
}

start();
