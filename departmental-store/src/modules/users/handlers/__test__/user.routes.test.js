import userController from "../../../../controller/user.controller.js";
import UserRoutes from "../user.routes.js";
import { userRegisterSchema } from "../schema/userRegister.schema.js";

describe("User Routes", () => {
    const mockFastify = {
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    };

    const mockController = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        getUserById: jest.fn(),
        updateUser: jest.fn(),
        deleteUser: jest.fn(),
        userLogin: jest.fn(),
    };

    describe("User Registration", () => {
        test("should call user register route", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.post).toHaveBeenCalledWith(
                "/users",
                userRegisterSchema,
                mockController.createUser
            );
        });
    });

    describe("Get All Users", () => {
        test("should call get all users route", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.get).toHaveBeenCalledWith(
                "/users",
                mockController.getAllUsers
            );
        });
    });

    describe("Get User By ID", () => {
        test("should call get user by id route", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.get).toHaveBeenCalledWith(
                "/users/:userId",
                mockController.getUserById
            );
        });
    });

    describe("Update User", () => {
        test("should call update user route (patch)", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.patch).toHaveBeenCalledWith(
                "/users/:userId",
                mockController.updateUser
            );
        });
    });

    describe("Delete User", () => {
        test("should call delete user route", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.delete).toHaveBeenCalledWith(
                "/users/:userId",
                mockController.deleteUser
            );
        });
    });

    describe("User Login", () => {
        test("should call user login route", async () => {
            await UserRoutes(mockFastify, { userController: mockController });
            expect(mockFastify.post).toHaveBeenCalledWith(
                "/users/login",
                mockController.userLogin
            );
        });
    });
});