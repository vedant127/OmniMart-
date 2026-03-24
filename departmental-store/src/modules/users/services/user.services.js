import { createUserEntity }  from "../domain/user.entity.js";
const userService = ({userRepository , auth , mailer}) => ({
    
    userlogin: async (email) => {
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

        return user;
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
        const user = await userRepository.getuserbyid(userId);

        // perform some business logic
        // e.g. checking permissions, etc.

        return user;
    },
    updateuser: async (userId, userData) => {
        const updatedUser = await userRepository.updateuser(userId, userData);

        // perform some business logic
        // e.g. validating data, etc.

        return updatedUser;
    },
    deleteuser: async (userId) => {
        const deletedUser = await userRepository.deleteuser(userId);

        // perform some business logic
        // e.g. logging, etc.

        return deletedUser;
    },
});

export default userService;