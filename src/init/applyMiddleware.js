// Apollo Server
import { apolloServer } from './apolloServer';

// Express App
import { app } from './app';

apolloServer.applyMiddleware({ app, cors: false });

export { apolloServer };
