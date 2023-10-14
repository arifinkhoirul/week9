const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

module.exports.authenticateUser = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];

	if (!bearerHeader) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	const token = bearerHeader.split(" ")[1];

	jwt.verify(token, JWT_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		req.user = user;
		next();
	});
};