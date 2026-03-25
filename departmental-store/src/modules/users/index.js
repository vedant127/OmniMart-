
import * as userRepository from "./repositories/user.repositories.js";
import userService from "./services/user.services.js";
import { auth } from "../shared/auth.js";
import { registeruserhandler } from "./handlers/user.handlers.js";
import { mailer } from "../shared/mailer.js";

//create repositry instance
export const registerusermodule = async (fastify) => {

    const userServiceInstance = userService({
        userRepository: userRepository,
        auth,
        mailer,
    });

    registeruserhandler(fastify , userServiceInstance);
};

export default registerusermodule;