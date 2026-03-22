import { auth } from "./auth";


export const authGuard = (req , replay) => {
    const token = req.headers.authorization;
    if(!token){
        replay.status(401).send({ message: "Unauthorized"});
    }
    const user = auth.verifyToken(token);
    if(!user){
        replay.status(401).send({ message: "Unauthorized"});
    }
    req.user = user;
    next();
}