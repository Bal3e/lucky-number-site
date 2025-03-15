import { pool } from "../config/db.js";

export const getAllData = async () => {
    try {
        const result = await pool.query('SELECT * FROM recentdata')
    } catch (error) {
        throw error;
        console.log(error.message)
    }
}