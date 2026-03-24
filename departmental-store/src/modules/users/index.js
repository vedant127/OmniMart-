import {query} from "../../db/index.js"
import userRepository from "./repository/user.repository.js";
import userService from "./services/user.services.js";
import { auth } from "../shared/auth.js";
import { registeruserhandler } from "./handlers/user.handlers.js";
import { mailer } from "../shared/mailer.js";

    //create repositry instance
    const registerusermodule = async (fastify) => {
        const userRepo = new userRepository(query);

        const userServiceInstance = userService({
            userRepository: userRepo,
            auth,
            mailer,
        });

        registeruserhandler(fastify , userServiceInstance);
    }
    //create userservice instance

    return{};


module.exports = {
    registerusermodule,
};