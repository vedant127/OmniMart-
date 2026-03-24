// import { userRegisterSchema } from "./schema/userRegister.schema.js";

// const userRoutes = async (fastify, options) => {
//     const { userController } = options;

//     fastify.post("/users", userRegisterSchema, userController.createUser);
//     fastify.get("/users", userController.getAllUsers);
//     fastify.get("/users/:userId", userController.getUserById);
//     fastify.patch("/users/:userId", userController.updateUser);
//     fastify.delete("/users/:userId", userController.deleteUser);
//     fastify.post("/users/login", userController.userLogin);
// };

// export default userRoutes;


export const registeruserhandler = async (fastify , service) =>{
    fastify.post("/users", async (request, reply) => {
        try {
            const user = await service.createuser(request.body);
            return reply.code(201).send(user);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    
    fastify.get("/users", async (request, reply) => {
        try {
            const users = await service.getalluser();
            return reply.code(200).send(users);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.get("/users/:userId", async (request, reply) => {
        try {
            const user = await service.getuserbyid(request.params.userId);
            return reply.code(200).send(user);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.patch("/users/:userId", async (request, reply) => {
        try {
            const updatedUser = await service.updateuser(request.params.userId, request.body);
            return reply.code(200).send(updatedUser);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete("/users/:userId", async (request, reply) => {
        try {
            const deletedUser = await service.deleteuser(request.params.userId);
            return reply.code(200).send(deletedUser);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.post("/users/login", async (request, reply) => {
        try {
            const user = await service.userlogin(request.body.email);
            return reply.code(200).send(user);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
} ;