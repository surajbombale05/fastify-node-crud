// index.ts or app.ts
import fastify from 'fastify';
import sequelize from './src/config/db';
import {CustomFields} from './src/models/user_schemas';
import customFieldsRoutes from './src/routes/customFieldsRoutes';
import productFieldRoutes from './src/routes/productRoutes';

const app = fastify();

// Register routes
app.register(customFieldsRoutes);
app.register(productFieldRoutes);

// Sync database and start server
(async () => {
    try {
        await sequelize.sync({ alter: true });
        await app.listen(3000);
        console.log('Server is running on http://localhost:3000');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
