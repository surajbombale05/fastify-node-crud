// controller/customFieldsController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CustomFields } from '../models/user_schemas'; // Adjust the path as needed
import userData from '../interfaces/user_interfaces'

export async function getCustomFields(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fields = await CustomFields.findAll();
        return fields;
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while fetching custom fields' });
    }
}

export async function getCustomFieldsById(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { id } = request.params as { id: string };
        const field = await CustomFields.findByPk(id);
        if (field) {
            reply.status(200).send({
                status_code: 200,
                data: field
            });
        } else {
            reply.code(404).send({ error: 'Custom field not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while fetching the custom field' });
    }
}

export async function createCustomFields(
    request: FastifyRequest,
    reply: FastifyReply
) {

    try {
        const { name, value, type } = request.body as userData;
        const newUser = await CustomFields.create({
             name,
             value,
             type,
         });
        reply.status(200).send({
            status_code: 200,
            message: "customer created successfully",
            data:newUser,
        });
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while creating the new customer' });
    }
}

export async function updateCustomFields(
    request: FastifyRequest,
    reply: FastifyReply
) {
   
    try {
        const { id } = request.params as { id: string };
        const {name , value, type} = request.body as userData;
        const [userDataUpdated] = await CustomFields.update(
            {name, value, type}, 
            {where: { id }}
        );
        if (userDataUpdated > 0) {
            reply.status(200).send({
               status_code:200,
               message : 'user updated successfully',
            })
        } else {
            reply.code(404).send({ error: 'user not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while updating the custom field' });
    }
}

export async function deleteCustomFields(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    
    try {
        const { id } = request.params;
        const deleted = await CustomFields.destroy({
            where: { id },
        });
        if (deleted) {
            reply.status(200).send({
                status_code: 200,
                message: 'user deleted successfully',
 
            });
        } else {
            reply.code(404).send({ error: 'user not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while deleting the user' });
    }
}
