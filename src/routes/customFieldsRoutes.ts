import { FastifyInstance } from 'fastify';
import { getCustomFields, getCustomFieldsById, createCustomFields, updateCustomFields, deleteCustomFields } from '../controller/user_controller';

async function customFieldsRoutes(fastify: FastifyInstance) {
    fastify.get('/user', getCustomFields);

    fastify.get('/user/:id', getCustomFieldsById);

    fastify.post('/user', createCustomFields);

    fastify.put('/user/:id', updateCustomFields);

    fastify.delete('/user/:id', deleteCustomFields);
}

export default customFieldsRoutes;
