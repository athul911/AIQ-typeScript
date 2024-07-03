import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Power Plants',
      version: '1.0.0',
      description: 'Find power plant details',
    },
  },
  apis: ['src/routes/*.ts'], // Path to your API routes or JSDoc annotated files
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
