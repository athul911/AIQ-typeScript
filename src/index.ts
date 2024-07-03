import express from 'express';
import cors from 'cors';
import plantsRoutes from './routes/plantsRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swaggerConfig';
import connectDB from './database/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/plants', plantsRoutes);

connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
