// Core
import { ApolloError } from 'apollo-server-express';

// Model
import { customerModel } from './model';

// Auth
import { authenticate } from '../../helpers/auth';

export const queries = {
    me: async (_, __, ctx) => {
        const customerId = authenticate(ctx);

        if (!customerId) {
            return null;
        }

        try {
            return await customerModel.findById(customerId);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
};