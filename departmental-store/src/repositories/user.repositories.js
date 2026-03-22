import { query } from "../db/dboperation.js";

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
export const findUserByEmail = finduserbyemail;