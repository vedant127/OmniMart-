import { createUserEntity }  from "../domain/user.entity.js";
const userService = ({userRepository , auth , mailer}) => ({
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
    userlogin: async (email) => {
        const user = await userRepository.finduserbyemail(email);
        return user;
    }
});

export default userService;