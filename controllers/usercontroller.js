const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Membuat pengguna baru
const registerUser = async (req, res) => {
	try {
		const { email, gender, password, role } = req.body;
		const newUser = await User.createUser(email, gender, password, role);

		// Setel payload token
		const payload = {
			id: newUser.id,
			email: newUser.email,
			role: newUser.role,
		};

		// Buat token JWT 
		const token = jwt.sign(payload, process.env.JWT_KEY, {
			expiresIn: "1h",
		});

		const response = {
			message: "Registrasi berhasil!",
			user: newUser,
			token: token,
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
};

// Login pengguna
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.getUserByEmail(email);

		if (!user) {
			return res.status(401).json({ message: "Autentikasi gagal!" });
		}

		if (password === user.password) {
			// Setel payload token
			const payload = {
				id: user.id,
				email: user.email,
                gender: user.gender,
				role: user.role
			};

			// Buat token JWT 
			const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

			res.json({ message: "Autentikasi berhasil!", user: payload, token: token });
		} else {
			res.status(401).json({ message: "Autentikasi gagal!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
	}
};

module.exports = { registerUser, loginUser };