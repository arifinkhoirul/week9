const swaggerJsdoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Movie API",
			version: "1.0.0",
			description: "API Film dan Pengguna",
		},
		servers: [
			{
				url: "http://localhost:3000", 
				description: "Development Server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;