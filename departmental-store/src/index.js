import Fastify from "fastify"; 
import userRoutes from "./routes/user.routes.js";


const fastify = Fastify({
  logger: true,
});

// Register the userRoutes with a prefix
fastify.register(userRoutes, {
  prefix: '/api/v1/users'
});


//emit the evnet
const start = async () => {
  try {
    await fastify.listen({ port: 9000, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:9000/api/v1/users/user`);
  } catch (err) {
    fastify.log.error(err); 
    process.exit(1);
  }
}

start();
