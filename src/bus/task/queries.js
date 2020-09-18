// Core
import { ApolloError } from 'apollo-server-express';

// Model
import { taskModel } from './model';

// Authentication
import { authenticate } from '../../helpers/auth';

export const queries = {
    tasks: (_, __, ctx) => {
        const customerId = authenticate(ctx);
        try {
            return taskModel.readAll(customerId);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
    task: (_, { id }, ctx) => {
        authenticate(ctx);
        try {
            return taskModel.readById(id);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    }
};