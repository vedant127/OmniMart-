import userControllerFactory from "../user.controller.js";

describe("user controller", () => {
    let mockUserService;
    let userController;
    let request;
    let reply;

    beforeEach(() => {
        // Create mock service functions based on what the controller expects
        mockUserService = {
            getalluser: jest.fn(),
            getuserbyid: jest.fn(),
            createuser: jest.fn(), // Using lowercase to match controller's internal calls
            updateuser: jest.fn(),
            deleteuser: jest.fn(),
            userlogin: jest.fn(),
        }

        // Create standard mock Request and Reply objects
        request = {
            body: {},
            params: {}
        };
        
        reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        // Instantiate the controller
        userController = userControllerFactory(mockUserService);
    });

    describe("createUser", () => {
        test("should create a user and send success response", async () => {
            const newUser = {
                email: "test@test.com",
                name: "Test User",
                password: "password",
            };
            
            // Note: Keeping `createuser` all lowercase to map to your service file methods!
            mockUserService.createuser.mockResolvedValue(newUser);

            request = { body: newUser };
            await userController.createUser(request, reply);
            
            expect(mockUserService.createuser).toHaveBeenCalledWith(newUser);
            expect(reply.status).toHaveBeenCalledWith(201);
            expect(reply.send).toHaveBeenCalledWith(newUser);
        });
    });

    describe("getAllUsers", () => {
        test("should get all users and send success response", async () => {
            const users = [
                { id: 1, name: "Test User", email: "test@test.com", password: "password" }
            ];

            mockUserService.getalluser.mockResolvedValue(users);

            await userController.getAllUsers(request, reply);
            
            expect(reply.status).toHaveBeenCalledWith(200);
            expect(reply.send).toHaveBeenCalledWith(users);
            expect(mockUserService.getalluser).toHaveBeenCalledTimes(1);
        });
    });

    describe("getUserById", () => {
        test("should get a user by ID and send success response", async () => {
            const user = { id: 1, name: "Test User", email: "test@test.com", password: "password" };

            request.params = { userId: 1 };
            mockUserService.getuserbyid.mockResolvedValue(user);

            await userController.getUserById(request, reply);
            
            expect(reply.status).toHaveBeenCalledWith(200);
            expect(reply.send).toHaveBeenCalledWith(user);
            expect(mockUserService.getuserbyid).toHaveBeenCalledWith(1);
        });
    });

    describe("updateUser", () => {
        test("should update an existing user and send success response", async () => {
            const updateBody = { name: "Test User", email: "test@test.com", password: "password" };
            const updatedUser = { id: 1, ...updateBody };

            request.params = { userId: 1 };
            request.body = updateBody;

            mockUserService.updateuser.mockResolvedValue(updatedUser);

            await userController.updateUser(request, reply);
            
            expect(reply.status).toHaveBeenCalledWith(200);
            expect(reply.send).toHaveBeenCalledWith(updatedUser);
            
            // The controller reshapes the data to include ID inside updatedUser
            const expectedUpdateArg = { id: 1, ...updateBody };
            expect(mockUserService.updateuser).toHaveBeenCalledWith(1, expectedUpdateArg);
        });
    });

    describe("deleteUser", () => {
        test("should delete a user and send success response", async () => {
            const deletedUser = { id: 1, name: "Test User" };

            request.params = { userId: 1 };
            mockUserService.deleteuser.mockResolvedValue(deletedUser);

            await userController.deleteUser(request, reply);
            
            expect(reply.status).toHaveBeenCalledWith(200);
            expect(reply.send).toHaveBeenCalledWith(deletedUser);
            expect(mockUserService.deleteuser).toHaveBeenCalledWith(1);
        });
    });

    describe("userLogin", () => {
        test("should login a user and send success response", async () => {
             const loginData = { email: "test@test.com", password: "password123" };
             const loggedUser = { id: 1, email: "test@test.com", password: "password123" };

             request.body = loginData;
             mockUserService.userlogin.mockResolvedValue(loggedUser);

             await userController.userLogin(request, reply);
             
             expect(reply.status).toHaveBeenCalledWith(200);
             expect(reply.send).toHaveBeenCalledWith(loggedUser);
             // The controller passes the raw email string to the service (based on how it is written)
             expect(mockUserService.userlogin).toHaveBeenCalledWith(loginData.email);
        });
    });
});