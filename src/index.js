// Server
import { server } from './init/server';

// Database
import './init/db';

// Endpoints
import { graphqlPath, subscriptionsPath } from './init/apolloServer';

// Config
import { PORT } from './init/config';

server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${subscriptionsPath}`);
});
