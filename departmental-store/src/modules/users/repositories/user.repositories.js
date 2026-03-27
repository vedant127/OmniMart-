import { query } from "../../../db/dboperation.js";

export const createuser = async ({name, email, password, role = 'user'}) => {
    const res = await query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, password, role]
    );
    return res[0];
};

export const getalluser = async () => {
    const res = await query("SELECT * FROM users");
    return res;
};

export const getuserbyid = async (id) => {
    const res = await query("SELECT * FROM users WHERE id = $1", [id]);
    return res[0];
};

export const updateuser = async (id, {name, email, password, role = 'user'}) => {
    const res = await query(
        "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
        [name, email, password, role, id]
    );
    return res[0];
};

export const deleteuser = async (id) => {
    const res = await query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return res[0];
};

export const finduserbyemail = async (email) => {
    const res = await query("SELECT * FROM users WHERE email = $1", [email]);
    return res[0];
};

// Keeping original camelCase export just in case
// Keeping original camelCase export just in case
export const findUserByEmail = finduserbyemail;

// -- Addresses --
export const addUserAddress = async (userId, {address_line1, address_line2, city, state, postal_code, country}) => {
    const res = await query(
        "INSERT INTO user_addresses (user_id, address_line1, address_line2, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [userId, address_line1, address_line2, city, state, postal_code, country]
    );
    return res[0];
};

export const getUserAddress = async (userId) => {
    return await query("SELECT * FROM user_addresses WHERE user_id = $1", [userId]);
};

export const updateUserAddress = async (userId, {id, address_line1, address_line2, city, state, postal_code, country}) => {
    const res = await query(
        "UPDATE user_addresses SET address_line1 = $1, address_line2 = $2, city = $3, state = $4, postal_code = $5, country = $6 WHERE user_id = $7 AND id = $8 RETURNING *",
        [address_line1, address_line2, city, state, postal_code, country, userId, id]
    );
    return res[0];
};

export const deleteUserAddress = async (userId, id) => {
    const res = await query("DELETE FROM user_addresses WHERE user_id = $1 AND id = $2 RETURNING *", [userId, id]);
    return res[0];
};
