import { auth } from "./auth.js";

export const authGuard = async (req , replay) => {
    let token = req.headers.authorization;
    if(!token){
        return replay.status(401).send({ message: "Unauthorized"});
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }
    const user = await auth.verifyToken(token);
    if(!user){
        return replay.status(401).send({ message: "Unauthorized"});
    }
    req.user = user;
}