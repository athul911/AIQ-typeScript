import { Router } from 'express';
import { validatePlantQuery } from '../middlewares/validationMiddleware';
import { getPlants, uploadPlants} from '../controllers/plantsController';
import { uploadExcelMiddleware } from '../middlewares/validationMiddleware';




const router = Router();


/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Retrieve a list of plants.
 *     description: Retrieve a list of plants based on the specified state and top N count(based on annual net generation).
 *     parameters:
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         required: false
 *         description: State code to filter plants.
 *       
 *       - in: query
 *         name: topN
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number of top plants to retrieve.
 *      
 *       - in: query
 *         name: fileID
 *         schema:
 *           type: string
 *         required: true
 *         description: Uploaded file ID
 *     responses:
 *       '200':
 *         description: A list of plants based on the state and top N count.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *      
 *                  
 *       '500':
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/', validatePlantQuery, getPlants);



/**
 * @swagger
 * /plants/upload:
 *   post:
 *     summary: Upload plant data.
 *     description: Upload plant data from an Excel file to the database.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Plant data uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/upload',uploadExcelMiddleware,uploadPlants);



export default router;
