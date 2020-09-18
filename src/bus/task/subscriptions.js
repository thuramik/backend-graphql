// Core
import { pubSub } from '../../init/pubSub';

// Events
import { events } from './events';

export const subscriptions = {
    taskAdded: {
        subscribe: () => pubSub.asyncIterator([events.TASK_ADDED])
    }
};
