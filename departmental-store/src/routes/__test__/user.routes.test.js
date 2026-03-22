import userRoutesFactory from "../user.routes.js";
import fastify from "fastify";

describe("user routes", () => {
    let app;
    let mockUserController;

    beforeEach(() => {
        // Create mock controller! Routes interact with Controllers, not Services.
        mockUserController = {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            userLogin: jest.fn(),
        };

        // Create a new Fastify instance for each test
        app = fastify();

        // Register the user routes with the mock controller
        app.register(userRoutesFactory, { userController: mockUserController });
    });

    afterEach(() => {
        // Close the server after each test
        app.close();
    });

    describe("POST /user", () => {
        test("should create a user and return handler response", async () => {
            const newUser = {
                email: "test@test.com",
                name: "Test User",
                password: "password",
            };

            // Mock the controller route handler to send back a controlled payload
            mockUserController.createUser.mockImplementation(async (req, reply) => {
                reply.status(201).send(newUser);
            });

            const response = await app.inject({
                method: "POST",
                url: "/user",
                payload: newUser,
            });

            expect(response.statusCode).toBe(201);
            expect(response.json()).toEqual(newUser);
            expect(mockUserController.createUser).toHaveBeenCalled();
        });
    });

    describe("GET /user", () => {
        test("should get all users and return 200", async () => {
            const users = [
                { id: 1, name: "Test User", email: "test@test.com", password: "password" }
            ];

            mockUserController.getAllUsers.mockImplementation(async (req, reply) => {
                reply.status(200).send(users);
            });

            const response = await app.inject({
                method: "GET",
                url: "/user",
            });

            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(users);
            expect(mockUserController.getAllUsers).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /user/:userId", () => {
        test("should get a user by ID and return 200", async () => {
            const user = { id: 1, name: "Test User", email: "test@test.com", password: "password" };

            mockUserController.getUserById.mockImplementation(async (req, reply) => {
                reply.status(200).send(user);
            });

            const response = await app.inject({
                method: "GET",
                url: "/user/1",
            });

            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(user);
            expect(mockUserController.getUserById).toHaveBeenCalled();
        });
    });

    describe("PUT /user/:userId", () => {
        test("should update a user and return 200", async () => {
            const updateBody = { name: "Updated User", email: "updated@test.com", password: "password" };
            const updatedUser = { id: 1, ...updateBody };

            mockUserController.updateUser.mockImplementation(async (req, reply) => {
                reply.status(200).send(updatedUser);
            });

            const response = await app.inject({
                method: "PUT",
                url: "/user/1",
                payload: updateBody,
            });

            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(updatedUser);
            expect(mockUserController.updateUser).toHaveBeenCalled();
        });
    });

    describe("DELETE /user/:userId", () => {
        test("should delete a user and return 200", async () => {
            const deletedUser = { id: 1, name: "Test User" };

            mockUserController.deleteUser.mockImplementation(async (req, reply) => {
                reply.status(200).send(deletedUser);
            });

            const response = await app.inject({
                method: "DELETE",
                url: "/user/1",
            });

            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(deletedUser);
            expect(mockUserController.deleteUser).toHaveBeenCalled();
        });
    });

    describe("POST /user/login", () => {
        test("should login a user and return 200", async () => {
            const loginData = { email: "test@test.com", password: "password123" };
            const loggedUser = { id: 1, email: "test@test.com", password: "password123" };

            mockUserController.userLogin.mockImplementation(async (req, reply) => {
                reply.status(200).send(loggedUser);
            });

            const response = await app.inject({
                method: "POST",
                url: "/user/login",
                payload: loginData,
            });

            expect(response.statusCode).toBe(200);
            expect(response.json()).toEqual(loggedUser);
            expect(mockUserController.userLogin).toHaveBeenCalled();
        });
    });
});