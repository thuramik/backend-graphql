// Core
import { ApolloError, AuthenticationError } from 'apollo-server-express';

// Model
import { customerModel } from './model';

// Auth
import { authenticate, removeCookie, setCookie } from '../../helpers/auth';

export const mutations = Object.freeze({
    signUp: (_, { customer }) => {
        try {
            return customerModel.signUp(customer);
        } catch ({ message }) {
            throw new ApolloError(message);
        }
    },
    login: async (_, { customer }, ctx) => {
        try {
            const verifiedCustomer = await customerModel.findByQuery(customer);

            setCookie(verifiedCustomer.id, ctx);

            return verifiedCustomer;
        } catch ({ message }) {
            throw new AuthenticationError(message);
        }
    },
    logout: async (_, __, ctx) => {
        const customerId = authenticate(ctx);
        const customer = await customerModel.findById(customerId);

        removeCookie(ctx);

        return customer;
    }
});