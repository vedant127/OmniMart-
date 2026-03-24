import { hash } from "bcryptjs";
import { createUserEntity }  from "../domain/user.entity.js";
const userService = ({userRepository , auth , mailer}) => ({
    
    userlogin: async (email , password) => {
        const rawuser = await userRepository.getuserbyemail(email);
        if(!rawuser){
            throw new Error("User not found");
        }

        const user = createUserEntity({
            id: rawuser.id,
            name: rawuser.name,
            email: rawuser.email,
            hashpassword: rawuser.password,
            role: rawuser.role,
        });

        const valid = await user.checkPassword(password , auth);
        if(!valid){
            throw new Error("Invalid password");
        }

        //access token

         const accessToken = auth.generateToken({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        }, {
            expiresIn: "15m"
        });

        const refreshToken = auth.signRefreshToken({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        }, {
            expiresIn: "7d"
        });


        return user , accessToken , refreshToken;
    },
    createuser: async (userData) => {    
        
        const hashpassword = await auth.hashpassword(userData.password);

        // create user entity 
        const UserEntity = createUserEntity({
            ...userData,
             hashpassword,
        });
           
        // store the data in the database

        // hash password
        const user = await userRepository.createuser({
            name: UserEntity.getName(),
            email: UserEntity.getEmail(),
            password: UserEntity.getPassword(),
            role: UserEntity.getRole(),
        });
        
        // perform some business logic
        // sending email, etc.
        await mailer.sendregistrationemail(
            user.email,
            user.name,
            `welcome ${user.name} ! your account has been created successfully`
        );

        return user;
    },
    getalluser: async () => {
        // pass the offset and limit as parameters
        const users = await userRepository.getalluser();

        // perform some business logic
        // e.g. filtering, sorting, etc.

        return users;
    },
    getuserbyid: async (userId) => {
        const rawuser = await userRepository.getuserbyid(userId);
        const user = genrateuserentity({
            id: rawuser.id,
            name: rawuser.name,
            email: rawuser.email,
            hashpassword: rawuser.password,
            role: rawuser.role,
        })

        return user;
    },
    updateuser: async (userId, userData) => {

        const existinguser = await userRepository.getuserbyid(userId);
        if(!existinguser){
            throw new Error("User not found");
        }

       const hashpassword = userData.password
       ? await auth.hashpassword(userData.password)
       : existinguser.password;


       const UserEntity = createUserEntity({
        id: existinguser.id,
        name: userData.name || existinguser.name,
        email: userData.email || existinguser.email,
        hashpassword: hashpassword,
        role: userData.role || existinguser.role,
       })

       const updatedUserData = {
        name: UserEntity.getName(),
        email: UserEntity.getEmail(),
        password: UserEntity.getPassword(),
        role: UserEntity.getRole(),
       }

        const updatedUser = await userRepository.updateuser(userId , updatedUserData);

        // perform some business logic
        // e.g. validating data, etc.

        return {
            id: updatedUser.id,
            name: updatedUser.getname(),
            email: updatedUser.getEmail(),
            role: updatedUser.getRole(),
        };
    },
    deleteuser: async (userId) => {
        const deletedUser = await userRepository.deleteuser(userId);

        // perform some business logic
        // e.g. logging, etc.

        return{ id: userId};
    },

    resetpassword: async (email) => {

        // genrate new password

        const newPassword = Math.random().toString(12).slice(-8);

        const hashpassword = await auth.hashpassword(newPassword);

        //updte new password

        const updatedUser = await userRepository.getuserbyemail(email);
        if (!user) {
            throw new console.error("user not found with the provided email");
         }

         await userRepository.updatedUser(user.id, {
            hashpassword
         });

        //send the new password to the user's email

        await mailer.sendregistrationemail(
            user.email,
            user.name,
            `welcome ${user.name} ! your account has been created successfully`
        );
        return{ Message: "a new password is send to your registered email "};
    },

    refreshToken: async (token) => {

        const decodedToken = auth.verifyRefreshToken(token);
        if(!decodedToken){
            throw new Error("Invalid refresh token");
        }

        const user = await userRepository.getuserbyid(decodedToken.id);
        if(!user){
            throw new Error("User not found");
        }

        const accessToken = auth.generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        }, {
            expiresIn: "15m"
        });

        const refreshToken = auth.signRefreshToken({
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        }, {
            expiresIn: "7d"
        });

        return { accessToken, refreshToken };

    },

});

export default userService;