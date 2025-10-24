import express from "express";
import { container } from "tsyringe";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = container.resolve(UserController);

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - email
 *         - roleId
 *         - active
 *         - createdAt
 *         - updatedAt
 *         - createdBy
 *         - updatedBy
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the user.
 *         username:
 *           type: string
 *           description: User's display name.
 *         email:
 *           type: string
 *           description: User's email address.
 *         roleId:
 *           type: string
 *           description: ID of the role assigned to the user.
 *         active:
 *           type: boolean
 *           description: Whether the user is active or not.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the user was last updated.
 *         createdBy:
 *           type: string
 *           description: ID or username of the user who created this record.
 *         updatedBy:
 *           type: string
 *           description: ID or username of the user who last updated this record.
 *         departmentId:
 *           type: string
 *           description: Optional ID of the department the user belongs to.
 *
 *     UserRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - departmentId
 *         - active
 *       properties:
 *         username:
 *           type: string
 *           description: Optional username for the user.
 *         email:
 *           type: string
 *           description: User's email address.
 *         password:
 *           type: string
 *           description: User's password (never returned in responses).
 *         departmentId:
 *           type: string
 *           description: Department ID to which the user belongs.
 *         roleId:
 *           type: string
 *           description: Optional role ID assigned to the user.
 *         active:
 *           type: boolean
 *           description: Whether the user is active or not.
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for managing users.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       500:
 *         description: Server error
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to retrieve user
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Failed to create user
 */
router.post("/", userController.addUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to update user
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to delete user
 */
router.delete("/:id", userController.deleteUser);

export default router;
