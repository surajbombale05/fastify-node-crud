// controller/customFieldsController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductSchema } from '../models/product_schemas';
import productData from '../interfaces/product_interfaces';
import { CustomFields } from '../models/user_schemas';


export async function getAllProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
        const product = await ProductSchema.findAll({
            include: [
                {
                    model: CustomFields,
                    as: 'user',  // This should match the alias in the association
                    attributes: ['name', 'value'],  // Specify which fields to include
                },
            ]
        });
        return product;
    } catch (error) {
        console.error('Error fetching products:', error);
        reply.code(500).send({ error: 'An error occurred while fetching products' });
    }
}


export async function getProductById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { id } = request.params as { id: string };
        const product = await ProductSchema.findByPk(id);
        if (product) {
            reply.status(200).send({
                status_code: 200,
                data: product
            });
        } else {
            reply.code(404).send({ error: 'product not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while fetching the product' });
    }
}

export async function createProduct(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { userId, productOwner, productName } = request.body as productData;
        
        const newProduct = await ProductSchema.create({
            userId,
            productOwner,
            productName
        });
        
        reply.status(200).send({
            status_code: 200,
            message: "Product created successfully",
            data: newProduct,
        });
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while creating the new product' });
    }
}


export async function updateProductById(
    request: FastifyRequest,
    reply: FastifyReply
) {

    try {
        const { id } = request.params as { id: string };
        const { productOwner, productName } = request.body as productData;
        const [productDataUpdated] = await ProductSchema.update(
            { productOwner, productName },
            { where: { id } }
        );
        if (productDataUpdated > 0) {
            reply.status(200).send({
                status_code: 200,
                message: 'product updated successfully',
            })
        } else {
            reply.code(404).send({ error: 'product not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while updating the product' });
    }
}

export async function deleteProductById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const deleted = await ProductSchema.destroy({
            where: { id },
        });
        if (deleted) {
            reply.status(200).send({
                status_code: 200,
                message: 'product deleted successfully',

            });
        } else {
            reply.code(404).send({ error: 'product not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while deleting the product' });
    }
}
