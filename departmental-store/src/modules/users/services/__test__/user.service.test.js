import userServiceFactory from "../user.services.js";

describe("user service" , () => {
    let mockuserrepo;
    let userservice;

    beforeEach(() => {
        // Create mock repository functions
        mockuserrepo = {
            createuser: jest.fn(),
            getalluser : jest.fn(),
            getuserbyid : jest.fn(),
            updateuser : jest.fn(),
            deleteuser : jest.fn(),
            finduserbyemail: jest.fn(),
        }
        
        // Instantiate the service using our mocked database dependency!
        userservice = userServiceFactory(mockuserrepo);
    });

    describe("getalluser", () => {
        test("should successfully return all users", async () => {
            const mockUserResponse = [
                {
                    id: 1,
                    name: "john doe",
                    email: "test@test.com",
                    password: "password"
                }
            ];

            mockuserrepo.getalluser.mockResolvedValue(mockUserResponse);

            const result = await userservice.getalluser();
            expect(result).toEqual(mockUserResponse);
            expect(mockuserrepo.getalluser).toHaveBeenCalledTimes(1);
        });
    });

    describe("getuserbyid", () => {
        test("should successfully get a user by ID", async () => {
            const mockUserResponse = {
                id: 1,
                name: "john doe",
                email: "[EMAIL_ADDRESS]",
                password: "password"
            };

            mockuserrepo.getuserbyid.mockResolvedValue(mockUserResponse);

            const result = await userservice.getuserbyid(1);
            expect(result).toEqual(mockUserResponse);
            expect(mockuserrepo.getuserbyid).toHaveBeenCalledTimes(1);
        });
    });

    describe("createUser", () => {
        test("should successfull create a new user", async () => {
            const input = {
                name: "John Doe",
                email: "test@test.com",
                password: "password123",
                role: "user",
            }

            const mockUserResponse = {
                id: 1,
                name: input.name,
                email: input.email,
                role: input.role,
            }

            mockuserrepo.createuser.mockResolvedValue(mockUserResponse);
            
            const response = await userservice.createuser(input);
            expect(response).toEqual(mockUserResponse);
            expect(mockuserrepo.createuser).toHaveBeenCalledWith(input);
        });
    });

    describe("updateuser", () => {
        test("should successfully update an existing user", async () => {
            const mockUserResponse = {
                id: 1,
                name: "john doe",
                email: "[EMAIL_ADDRESS]",
                password: "password"
            };

            mockuserrepo.updateuser.mockResolvedValue(mockUserResponse);

            const result = await userservice.updateuser(1, mockUserResponse);
            expect(result).toEqual(mockUserResponse);
            expect(mockuserrepo.updateuser).toHaveBeenCalledTimes(1);
        });
    });

    describe("deleteuser", () => {
        test("should successfully delete a user", async () => {
            const mockUserResponse = {
                id: 1,
                name: "john doe",
                email: "[EMAIL_ADDRESS]",
                password: "password"
            };

            mockuserrepo.deleteuser.mockResolvedValue(mockUserResponse);

            const result = await userservice.deleteuser(1);
            expect(result).toEqual(mockUserResponse);
            expect(mockuserrepo.deleteuser).toHaveBeenCalledTimes(1);
        });
    });

    describe("userlogin", () => {
        test("should successfully login a user", async () => {
            const mockUserResponse = {
                id: 1,
                name: "john doe",
                email: "[EMAIL_ADDRESS]",
                password: "password"
            };

            // Note: The service uses finduserbyemail underneath!
            mockuserrepo.finduserbyemail.mockResolvedValue(mockUserResponse);

            const result = await userservice.userlogin("[EMAIL_ADDRESS]");
            expect(result).toEqual(mockUserResponse);
            expect(mockuserrepo.finduserbyemail).toHaveBeenCalledTimes(1);
        });
    });
});
