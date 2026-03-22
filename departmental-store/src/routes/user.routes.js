const userRoutes = async (fastify, options) => {
    const { userController } = options;
    fastify.post("/user", {
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" }
                },
                required: ["name", "email", "password"],
            }
        }
    }, userController.createUser);
    fastify.get("/user", userController.getAllUsers);
    fastify.get("/user/:userId", userController.getUserById);
    fastify.put("/user/:userId", userController.updateUser);
    fastify.delete("/user/:userId", userController.deleteUser);
    fastify.post("/user/login", userController.userLogin);
};

export default userRoutes;

