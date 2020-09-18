export const PORT = 4000;

export const APP_SECRET = 'APP_SECRET';

export const sessionOptions = {
    key: 'token',
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    },
};

export const corsOptions = {
    origin: `http://localhost:3000`,
    credentials: true
};
