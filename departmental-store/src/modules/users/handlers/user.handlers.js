import { userRegisterSchema } from "./schema/userRegister.schema.js";

const userRoutes = async (fastify, options) => {
    const { userController } = options;

    fastify.post("/users", userRegisterSchema, userController.createUser);
    fastify.get("/users", userController.getAllUsers);
    fastify.get("/users/:userId", userController.getUserById);
    fastify.patch("/users/:userId", userController.updateUser);
    fastify.delete("/users/:userId", userController.deleteUser);
    fastify.post("/users/login", userController.userLogin);
};

export default userRoutes;
