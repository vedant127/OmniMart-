import {query} from "../../db/index.js"
import userRepository from "./repository/user.repository.js";
import userService from "./services/user.services.js";
import { auth } from "../shared/auth.js";
im

    //create repositry instance
    const registerusermodule = async (fastify) => {
        const userRepo = new userRepository();

        const userService = new userService(userRepo);
    }
    //create userservice instance

    return{};


module.exports = {
    registerusermodule,
};