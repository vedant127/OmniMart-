import Fastify from "fastify"; 
import userRoutes from "./routes/user.routes.js";

const fastify = Fastify({
    logger: true,
});

//register the userRoutes

userRoutes(fastify);

const start = async () => {
    try {
        
        await fastify.listen({ port: 4000, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err); 
        process.exit(1);
    }
}

start();
