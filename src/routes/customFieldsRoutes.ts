import { FastifyInstance } from 'fastify';
import { getCustomFields, getCustomFieldsById, createCustomFields, updateCustomFields, deleteCustomFields } from '../controller/user_controller';

async function customFieldsRoutes(fastify: FastifyInstance) {
    fastify.get('/program/custom-fields', getCustomFields);

    fastify.get('/program/custom-fields/:id', getCustomFieldsById);

    fastify.post('/custom-fields', createCustomFields);

    fastify.put('/custom-fields/:id', updateCustomFields);

    fastify.delete('/program/custom-fields/:id', deleteCustomFields);
}

export default customFieldsRoutes;
