import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();

const dbconfig = Object({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : String(process.env.DB_PASSWORD),
    port : Number(process.env.DB_PORT) || 5454
});


const pool = new Pool(dbconfig);

export default pool; 