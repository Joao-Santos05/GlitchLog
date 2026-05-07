import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GlitchLog API',
            version: '1.0.0',
            description: 'Documentação oficial da API do GlitchLog (Back-end).',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Lê as anotações nos arquivos de rota
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
