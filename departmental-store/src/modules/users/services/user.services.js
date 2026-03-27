import { createUserEntity } from "../domain/user.entity.js";

const userService = ({ userRepository, auth, mailer }) => ({

    // ✅ LOGIN
    userlogin: async (email, password) => {
        const rawuser = await userRepository.finduserbyemail(email);
        if (!rawuser) {
            throw new Error("User not found");
        }

        const user = createUserEntity({
            id: rawuser.id,
            name: rawuser.name,
            email: rawuser.email,
            hashpassword: rawuser.password,
            role: rawuser.role,
        });

        const valid = await user.checkPassword(password, auth);
        if (!valid) {
            throw new Error("Invalid password");
        }

        const payload = {
            id: user.getId(),
            email: user.getEmail(),
            role: user.getRole(),
        };

        const accessToken = await auth.generateToken(payload);
        const refreshToken = await auth.signrefreshtoken(payload);

        return {
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
            },
            accessToken,
            refreshToken,
        };
    },

    // ✅ REGISTER
    createuser: async (userData) => {
        // Check if user already exists
        const existingUser = await userRepository.finduserbyemail(userData.email);
        if (existingUser) {
            const error = new Error("User with this email already exists");
            error.statusCode = 400;
            throw error;
        }

        const hashpassword = await auth.hashPassword(userData.password);

        const UserEntity = createUserEntity({
            ...userData,
            hashpassword,
        });

        const user = await userRepository.createuser({
            name: UserEntity.getName(),
            email: UserEntity.getEmail(),
            password: UserEntity.getPassword(),
            role: UserEntity.getRole(),
        });

        await mailer.sendRegistrationEmail(
            user.email,
            user.name,
            `Welcome ${user.name}! Your account has been created successfully.`
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    },

    // ✅ GET ALL USERS
    getalluser: async () => {
        const users = await userRepository.getalluser();
        return users;
    },

    // ✅ GET USER BY ID
    getuserbyid: async (userId) => {
        const rawuser = await userRepository.getuserbyid(userId);
        if (!rawuser) {
            throw new Error("User not found");
        }
        return {
            id: rawuser.id,
            name: rawuser.name,
            email: rawuser.email,
            role: rawuser.role,
        };
    },

    // ✅ UPDATE USER
    updateuser: async (userId, userData) => {
        const existinguser = await userRepository.getuserbyid(userId);
        if (!existinguser) {
            throw new Error("User not found");
        }

        const hashpassword = userData.password
            ? await auth.hashPassword(userData.password)
            : existinguser.password;

        const updatedUser = await userRepository.updateuser(userId, {
            name: userData.name || existinguser.name,
            email: userData.email || existinguser.email,
            password: hashpassword,
            role: userData.role || existinguser.role,
        });

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        };
    },

    // ✅ DELETE USER
    deleteuser: async (userId) => {
        await userRepository.deleteuser(userId);
        return { message: "User deleted successfully", id: userId };
    },

    // ✅ REFRESH TOKEN
    userrefreshtoken: async (token) => {
        const decodedToken = await auth.verifyrefreshtoken(token);
        if (!decodedToken) {
            throw new Error("Invalid refresh token");
        }

        const user = await userRepository.getuserbyid(decodedToken.id);
        if (!user) {
            throw new Error("User not found");
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = await auth.generateToken(payload);
        const refreshToken = await auth.signrefreshtoken(payload);

        return { accessToken, refreshToken };
    },

    // ✅ ADDRESSES
    addUserAddress: async (userId, addressData) => {
        return await userRepository.addUserAddress(userId, addressData);
    },

    getUserAddress: async (userId) => {
        return await userRepository.getUserAddress(userId);
    },

    updateUserAddress: async (userId, addressData) => {
        return await userRepository.updateUserAddress(userId, addressData);
    },

    deleteUserAddress: async (userId, addressData) => {
        return await userRepository.deleteUserAddress(userId, addressData.id);
    },
});

export default userService;