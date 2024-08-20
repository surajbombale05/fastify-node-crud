import { FastifyInstance } from 'fastify';
import {getAllProduct, getProductById , createProduct , updateProductById ,deleteProductById } from '../controller/product_controller';

async function productFieldRoutes(fastify: FastifyInstance) {
    fastify.get('/product', getAllProduct);
    fastify.get('/product/:id', getProductById);
    fastify.post('/product', createProduct);
    fastify.put('/product/:id', updateProductById);
    fastify.delete('/product/:id', deleteProductById);
}

export default productFieldRoutes;