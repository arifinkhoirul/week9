const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviecontroller");
const { authenticateUser } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Mendapatkan daftar movie berdasarkan paginasi.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Jumlah film yang akan diambil (defaultnya adalah 10).
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Jumlah film yang akan dilewati (defaultnya adalah 0).
 *     responses:
 *       200:
 *         description: Daftar film.
 *     tags:
 *       - movies
 */
router.get("/", movieController.getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Mendapatkan film berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Mendapatkan film berdasarkan ID.
 *     tags:
 *       - movies
 */
router.get("/:id", authenticateUser, movieController.getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Membuat film baru.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genres:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Film baru telah dibuat.
 *     tags:
 *       - movies
 */
router.post("/", authenticateUser, movieController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Menghapus film berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Film telah dihapus.
 *     tags:
 *       - movies
 */
router.delete("/:id", authenticateUser, movieController.deleteMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Memperbarui film berdasarkan ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Movie ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genres:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Film telah diperbarui.
 *     tags:
 *       - movies
 */
router.put("/:id", authenticateUser, movieController.updateMovie);

module.exports = router;