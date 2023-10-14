const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Membuat pengguna baru.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pengguna baru telah terdaftar.
 *     tags:
 *       - users
 */
router.post("/register", userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login untuk pengguna dan mendapatkan Token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informasi pengguna dan Token JWT untuk akses terotentikasi.
 *     tags:
 *       - users
 */
router.post("/login", userController.loginUser);

module.exports = router;