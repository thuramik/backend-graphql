// Core
import generateId from 'shortid';

// MongooseModel
import { MongooseTaskModel } from './schema';

export const taskModel = Object.freeze({
    async save (_task, customerId) {
        if (!_task) {
            throw new Error(`We need the first parameter: task`);
        }
        if (!customerId) {
            throw new Error(`We need the second parameter: customerId`);
        }
        const id = generateId();
        const futureTask = {
            id, // TODO: rename to hash
            customerId,
            ..._task,
            resolved: false,
        };
        await MongooseTaskModel.create(futureTask);
        return MongooseTaskModel.findOne({id}).select(['-_id', '-__v']).lean();
    },
    async readAll (customerId) {
        if (!customerId) {
            throw new Error(`We need the first parameter: customerId`);
        }
        return await MongooseTaskModel.find({customerId}).select(['-_id', '-__v']).lean();
    },
    async readById (id) {
        if (!id) {
            throw new Error(`We need the first parameter: taskId`);
        }
        const selectedTask = await MongooseTaskModel.findOne({id}).select(['-_id', '-__v']).lean();
        if (!selectedTask) {
            throw new Error(`We don't have a task with this id: ${id}`);
        }
        return selectedTask;
    },
    async removeAll (customerId) {
        if (!customerId) {
            throw new Error(`We need the first parameter: customerId`);
        }
        const { deletedCount } = await MongooseTaskModel.deleteMany({customerId});
        return { count: deletedCount };
    },
    async removeById (id) {
        if (!id) {
            throw new Error(`We need the first parameter: taskId`);
        }
        const selectedTask = await this.readById(id);
        if (!selectedTask) {
            throw new Error(`We don't have a task with this id: ${id}`);
        }
        await MongooseTaskModel.deleteOne({id});
        return selectedTask;
    },
    async updateById (id, task) {
        if (!id) {
            throw new Error(`We need the first parameter: taskId`);
        }
        if (!task) {
            throw new Error(`We need the second parameter: task`);
        }
        await MongooseTaskModel.updateOne({id}, {...task});
        return await this.readById(id);
    }
});