const pool = require("../db/database");

class Movie {
	// mendapatkan data film dengan pagination
	static async getMovies(limit, offset) {
		try {
			const query = {
				text: "SELECT * FROM movies LIMIT $1 OFFSET $2",
				values: [limit, offset],
			};

			const result = await pool.query(query);
			return result.rows;
		} catch (error) {
			throw error;
		}
	}

    // mendapatkan data film berdasarkan id
	static async getMovieById(id) {
		try {
			const query = {
				text: "SELECT * FROM movies WHERE id = $1",
				values: [id],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}

	// membuat data film baru
	static async createMovie(title, genres, year) {
		try {
			const query = {
				text: "INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *",
				values: [title, genres, year],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}

	// menghapus data film berdasarkan id
	static async deleteMovie(id) {
		try {
			const query = {
				text: "DELETE FROM movies WHERE id = $1 RETURNING *",
				values: [id],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}

	// update data film
	static async updateMovie(id, title, genres, year) {
		try {
			const query = {
				text: "UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1 RETURNING *",
				values: [id, title, genres, year],
			};

			const result = await pool.query(query);
			return result.rows[0];
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Movie;