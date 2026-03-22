const userController = (userService) => ({

    createUser: async (request, reply) => {
        const { name, email, password } = request.body;

        // Simulate user creation logic
        const newUser = {
            name,
            email,
            password,
        };

        // perform some business logic
        // handing over to another service
        const responseData = await userService.createuser(newUser);
        if (!responseData) {
            reply.status(500).send({
                message: "Internal Server Error",
            });
            return;
            // success response
        }

        // handle error

        // api layer (routes) => http layer (controller) => business logic layer (services) => data layer
        reply.status(201).send(responseData);
    },

    getAllUsers: async (request, reply) => {
        const result = await userService.getalluser();
        if (result) {
            // success response
        }
        // handle error
        reply.status(200).send(result);
    },

    getUserById: async (request, reply) => {
        const { userId } = request.params;
        const result = await userService.getuserbyid(userId);
        if (result) {
            // success response
        }
        // handle error
        reply.status(200).send(result);
    },

    updateUser: async (request, reply) => {
        const { userId } = request.params;
        const { name, email, password } = request.body;

        // Validate request body

        // Simulate user update logic
        const updatedUser = {
            id: userId,
            name,
            email,
            password,
        };

        const result = await userService.updateuser(userId, updatedUser);
        if (result) {
            // success response
        }
        // handle error
        reply.status(200).send(result);
    },

    deleteUser: async (request, reply) => {
        const { userId } = request.params;
        const result = await userService.deleteuser(userId);
        if (result) {
            // success response
        }
        // handle error
        reply.status(200).send(result);
    },

    userLogin: async (request, reply) => {
        const { email, password } = request.body;
        const responseData = await userService.userlogin(email);
        if (responseData) {
            reply.status(200).send(responseData);
        } else {
            reply.status(500).send({ message: "Internal Server Error" });
        }
    },

});

export default userController;
