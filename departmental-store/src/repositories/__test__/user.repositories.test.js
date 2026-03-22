import { createuser, getalluser, getuserbyid, updateuser, deleteuser } from "../user.repositories.js";
import { query } from "../../db/dboperation.js";

// Mock the database query engine
jest.mock("../../db/dboperation.js");

describe("User Repository Tests", () => {
    
    beforeEach(() => {
        jest.clearAllMocks(); // Automatically reset my mock state before each test
    });

    test("createuser" , async () => {
        const input = {
            name: "John Doe",
            email: "test@test.com",
            password: "password",
            role: "user",
        };
        const mockdbresult = [{ id: 1, ...input }];
        query.mockResolvedValue(mockdbresult);

        const result = await createuser(input);
        expect(result).toEqual(mockdbresult[0]);
        expect(query).toHaveBeenCalledWith(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [input.name, input.email, input.password, input.role]
        );
    });

    test("getalluser" , async () => {
        const mockdbresult = [
            { id: 1, name: "john doe", email: "test@test.com", password: "password", role: "user"},
            { id: 2, name: "jane doe", email: "test@test.com", password: "password", role: "user"},
        ];

        query.mockResolvedValue(mockdbresult);
        const result = await getalluser();
        
        expect(result).toEqual(mockdbresult);
        expect(query).toHaveBeenCalledWith("SELECT * FROM users");
    });

    test("getuserbyid" , async () => {
        const mockuser = {
            id: 1,
            name: "john doe",
            email: "test@test.com",
            password: "password",
            role: "user",
        };

        query.mockResolvedValue([mockuser]);
        const result = await getuserbyid(1);
        
        expect(result).toEqual(mockuser);
        expect(query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = $1", [1]);
    });

    test("updateuser" , async () => {
        const input = {
            name: "John Doe Updated",
            email: "test_updated@test.com",
            password: "newpassword",
            role: "user",
        };
        const mockdbresult = [{ id: 1, ...input }];
        
        query.mockResolvedValue(mockdbresult);

        const result = await updateuser(1, input); 
        
        expect(result).toEqual(mockdbresult[0]);
        expect(query).toHaveBeenCalledWith(
            "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
            [input.name, input.email, input.password, input.role, 1]
        );
    });

    test("deleteuser" , async () => {
        const mockdbresult = [{ id: 1, name: "John Doe", email: "test@test.com", role: "user" }];
        
        query.mockResolvedValue(mockdbresult);

        const result = await deleteuser(1); 
        
        expect(result).toEqual(mockdbresult[0]);
        expect(query).toHaveBeenCalledWith("DELETE FROM users WHERE id = $1 RETURNING *", [1]);
    });
});
