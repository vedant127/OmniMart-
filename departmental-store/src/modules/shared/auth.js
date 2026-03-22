import { compare , hash} from "bcryptjs";
import jwt from "jsonwebtoken";

 export const auth = {
    hashPassword: async (password) => {
        return await hash(password, 10);
    },
    comparePassword: async (password, hash) => {
        return await compare(password, hash);
    },
    generateToken: async (user) => {
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
    },
    verifyToken: async (token) => {
         try{
            return jwt.verify(token, process.env.JWT_SECRET);
        }catch(error){
            return null;
        }
    }, 

    signrefreshtoken: async (user) => {
        return jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "7d" });
    },
    verifyrefreshtoken: async (token) => {
        try{
            return jwt.verify(token, process.env.REFRESH_SECRET);
        }catch(error){
            return null;
        }
    }, 

    generateTokens: async (user) => {
        const token = await auth.generateToken(user);
        const refreshToken = await auth.signrefreshtoken(user);
        return { token, refreshToken };
    }
};

export default auth;