// Core
import generateId from 'shortid';

// MongooseModel
import { MongooseCustomerModel } from './schema';

export const customerModel = Object.freeze({
    async signUp (_customer) {
        if (!_customer) {
            throw new Error(`We need the first parameter: customer`);
        }

        const id = generateId();
        const futureCustomer = {
            id,
            ..._customer
        };

        await MongooseCustomerModel.create(futureCustomer);

        return MongooseCustomerModel.findOne({id}).select(['-_id', '-__v']).lean();
    },
    async findByQuery (expectedCustomer) {
        if (!expectedCustomer) {
            throw new Error(`We need the first parameter: expectedCustomer`);
        }

        const selectedCustomer = await MongooseCustomerModel.findOne(expectedCustomer).select(['-_id', '-__v']).lean();
        if (!selectedCustomer) {
            throw new Error(`We can't find a customer with current query`);
        }
        return selectedCustomer;
    },
    async findById (id) {
        if (!id) {
            throw new Error(`We need the first parameter: customerId`);
        }

        const selectedCustomer = await MongooseCustomerModel.findOne({id}).select(['-_id', '-__v']).lean();
        if (!selectedCustomer) {
            throw new Error(`We don't have a customer with this id: ${id}`);
        }
        return selectedCustomer;
    }
});
