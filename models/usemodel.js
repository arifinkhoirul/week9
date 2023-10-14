const pool = require("../db/database");

class User {
    // membuat pengguna baru
	static async createUser(email, gender, password, role) {
		try {
			const query = {
				text: "INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
				values: [email, gender, password, role],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}

    // mendapatkan pengguna berdasarkan email
	static async getUserByEmail(email) {
		try {
			const query = {
				text: "SELECT * FROM users WHERE email = $1",
				values: [email],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}
}

module.exports = User;