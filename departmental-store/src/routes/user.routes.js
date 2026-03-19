import *as usercontroller from "../controller/user.controller.js";

const userRoutes = async (fastify , Option) => {
    fastify.post("/user" , usercontroller.createuser);
};

export default userRoutes;
