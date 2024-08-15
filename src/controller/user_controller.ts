// controller/customFieldsController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import {CustomFields} from '../models/user_schemas'; // Adjust the path as needed

export async function getCustomFields(request: FastifyRequest, reply: FastifyReply) {
    try {
        const fields = await CustomFields.findAll();
        return fields;
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while fetching custom fields' });
    }
}

export async function getCustomFieldsById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
        const field = await CustomFields.findByPk(id);
        if (field) {
            return field;
        } else {
            reply.code(404).send({ error: 'Custom field not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while fetching the custom field' });
    }
}

export async function createCustomFields(request: FastifyRequest, reply: FastifyReply) {
    const newField = request.body as { name: string, value: string, type: string };
    try {
        const field = await CustomFields.create(newField);
        reply.code(201).send(field);
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while creating the custom field' });
    }
}

export async function updateCustomFields(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const updatedData = request.body as { name?: string, value?: string, type?: string };
    try {
        const [updated] = await CustomFields.update(updatedData, {
            where: { id },
        });
        if (updated) {
            const updatedField = await CustomFields.findByPk(id);
            return updatedField;
        } else {
            reply.code(404).send({ error: 'Custom field not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while updating the custom field' });
    }
}

export async function deleteCustomFields(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
        const deleted = await CustomFields.destroy({
            where: { id },
        });
        if (deleted) {
            reply.code(204).send();
        } else {
            reply.code(404).send({ error: 'Custom field not found' });
        }
    } catch (error) {
        reply.code(500).send({ error: 'An error occurred while deleting the custom field' });
    }
}
