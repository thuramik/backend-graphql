// Core
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

// Secret
import { APP_SECRET } from '../init/config';

export const authenticate = ({req}) => {
    const { token } = req.session;
    if (!token) {
        throw new AuthenticationError(`We don't have a token`);
    }
    const { customer } = jwt.verify(token, APP_SECRET);
    if (!customer) {
        throw new AuthenticationError('You are not authenticated');
    }
    return customer;
};

export const removeCookie = ({req}) => {
    req.session.cookie.maxAge = 0;
    req.session.token = null;
};

export const setCookie = (id, {req}) => {
    req.session.token = jwt.sign({ customer: id }, APP_SECRET);
};