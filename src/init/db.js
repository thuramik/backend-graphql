import { Database } from '../helpers/databaseConnector';

const database = new Database({
    server: '127.0.0.1',
    database: 'taskManager',
    port: 27017,
    user: 'root',
    password: 'rootPassword'
});

database.connect();
