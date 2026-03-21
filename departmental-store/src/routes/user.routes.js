import *as usercontroller from "../controller/user.controller.js";

const userRoutes = async (fastify , Option) => {
    fastify.post("/user" ,{
        schema : {
            body : {
                type : "object",
                properties : {
                    name : {type : "string"},
                    email : {type : "string"},
                    password : {type : "string"}
                },
                required : ["name" , "email" , "password"],
            }
        }
    } , usercontroller.createuser);
    fastify.get("/user" , usercontroller.getalluser);
    fastify.get("/user/:userid" , usercontroller.getuserbyid);
    fastify.put("/user/:userid" , usercontroller.updateuser);
    fastify.delete("/user/:userid" , usercontroller.deleteuser);
    fastify.post("/user/login" , usercontroller.userlogin);
};

export default userRoutes;
