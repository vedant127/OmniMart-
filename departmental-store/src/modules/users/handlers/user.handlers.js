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

import { authGuard } from "../shared/auth.middleware.js";


export const registeruserhandler = async (fastify , service) =>{
    // register user
    fastify.post(
      "/api/users",
      async (request, reply) => {
        try {
            const user = await service.createuser(request.body);
            reply.status(201).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

    // get all users
    fastify.get(
      "/api/users",
      { preHandler: authGuard },
      async (request, reply) => {
        try {
            const users = await service.getalluser();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

    // get user by id
    fastify.get(
      "/api/users/:userId",
      { preHandler: authGuard },
      async (request, reply) => {
        try {
            const user = await service.getuserbyid(request.params.userId);
            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

    // update user
    fastify.patch(
      "/api/users/:userId",
      { preHandler: authGuard },
      async (request, reply) => {
        try {
            const updatedUser = await service.updateuser(request.params.userId, request.body);
            reply.status(200).send(updatedUser);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

    // delete user
    fastify.delete(
      "/api/users/:userId",
      { preHandler: authGuard },
      async (request, reply) => {
        try {
            const deletedUser = await service.deleteuser(request.params.userId);
            reply.status(200).send(deletedUser);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

    // login
    fastify.post(
      "/api/users/login",
      async (request, reply) => {
        try {
            const tokens = await service.userlogin(request.body.email, request.body.password);
            reply.status(200).send(tokens);
        } catch (error) {
            reply.status(500).send(error);
        }
      }
    );

  //reset passwprd
  fastify.post(
    "/api/users/resetpassword",
    async (request, reply) => {
      try {
        const email = request.body.email;
        if (!email) {
            return reply.status(400).send({message: "email is required"});
        }
        const result = await service.resetpassword(email);
        reply.status(200).send(result);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  // add Address
  fastify.post(
    "/api/users/address",
    { preHandler: authGuard },
    async (request, reply) => {
      try {
        const address = await service.addUserAddress(
          request.user.id,
          request.body
        );
        reply.status(201).send(address);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

   // get address 
   fastify.get(
     "/api/users/address",
     { preHandler: authGuard },
     async (request, reply) => {
       try {
           const address = await service.getUserAddress(request.user.id);
           reply.status(200).send(address);
       } catch (error) {
           reply.status(500).send(error);
       }
     }
   );
 
   // update address
   fastify.patch(
     "/api/users/address",
     { preHandler: authGuard },
     async (request, reply) => {
       try {
           const address = await service.updateUserAddress(
             request.user.id,
             request.body
           );
           reply.status(200).send(address);
       } catch (error) {
           reply.status(500).send(error);
       }
     }
   );

   // delete address
   fastify.delete(
     "/api/users/address",
     { preHandler: authGuard },
     async (request, reply) => {
       try {
           const address = await service.deleteUserAddress(
             request.user.id,
             request.body
           );
           reply.status(200).send(address);
       } catch (error) {
           reply.status(500).send(error);
       }
     }
   );

   // refresh token
   fastify.post(
     "/users/refreshtoken",
     async (request, reply) => {
       try {
           const user = await service.userrefreshtoken(request.body.refreshToken || request.body.email);
           reply.status(200).send(user);
       } catch (error) {
           reply.status(500).send(error);
       }
     }
   );
};