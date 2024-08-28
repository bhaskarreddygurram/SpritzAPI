import { Router } from "express";
import authRoutes from './auth.js';
import { validateProjects } from "../middleware/validators.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getSystemInfo,
  healthcheck,
  projects,
  createprojects,
  updateprojects,
  deleteprojects,
  getBooks
} from "../controllers/DefaultController.js";

const router = Router();

// Auth routes
router.use('/auth', authRoutes);

//All get request methods
router.get("/", getSystemInfo);

router.get('/healthcheck', healthcheck);
router.get("/books", getBooks); // This should match /api/v1/books

//Project get API's
router.get('/projects',authMiddleware, projects);
router.get('/projects/:Id', projects);

//Project PUT API's
router.post('/projects',validateProjects, createprojects);

//Project patch API's
router.put('/projects', updateprojects);

//Projects Delete API's
router.delete('/projects', deleteprojects);                                                                                                                        

export default router;

// swagger docs
/**
 * @swagger
 * /healthcheck:
 *   get:
 *     summary: Check the health of the API
 *     description: Returns a success message if the API is healthy
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Welcome to Spritz API , Everything Connected
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     description: Retrieve a list of projects. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ProjectID
 *         schema:
 *           type: integer
 *         description: The ID of the project
 *       - in: query
 *         name: ProjectName
 *         schema:
 *           type: string
 *         description: The name of the project
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: A search query for the projects
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page for pagination
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ProjectID:
 *                     type: integer
 *                     example: 10
 *                   ProjectName:
 *                     type: string
 *                     example: Project SUN
 *                   StartDate:
 *                     type: string
 *                     format: date
 *                     example: 2023-03-15
 *                   EndDate:
 *                     type: string
 *                     format: date
 *                     example: 2023-09-15
 *                   Budget:
 *                     type: string
 *                     example: 50000.00
 *                   Status:
 *                     type: string
 *                     example: Completed
 *                   Description:
 *                     type: string
 *                     example: Testing and finalizing the SUN project.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */