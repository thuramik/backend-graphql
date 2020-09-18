// Core
import { ApolloError } from 'apollo-server-express';

// Model
import { taskModel } from './model';

// Authentication
import { authenticate } from '../../helpers/auth';

// Subscriptions
import { pubSub } from '../../init/pubSub';
import { events } from './events';

export const mutations = {
    addTask: async (_, { task }, ctx) => {
        const customerId = authenticate(ctx);
        try {
            const createdTask = await taskModel.save(task, customerId);

            await pubSub.publish(events.TASK_ADDED, {
                taskAdded: createdTask
            });

            return createdTask;
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
    removeAllTasks: async (_, { id }, ctx) => {
        const customerId = authenticate(ctx);
        try {
            return await taskModel.removeAll(customerId);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
    removeTask: async (_, { id }, ctx) => {
        authenticate(ctx);
        try {
            return await taskModel.removeById(id);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
    updateTask: async (_, { id, task }, ctx) => {
        authenticate(ctx);
        try {
            return await taskModel.updateById(id, task);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    }
};
