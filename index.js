const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const specs = require("./utils/swaggerconfig");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
	console.log(`Server is running on port : ${port}`);
});