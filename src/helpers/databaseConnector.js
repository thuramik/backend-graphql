import mongoose from 'mongoose';

export class Database {
    constructor({server, port, database, user, password: pass}) {
        const host = `${server}:${port}`;

        this.uri = `mongodb://${host}/${database}`;

        this.options = {
            user,
            pass,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.options);
            mongoose.set('useCreateIndex', true);

            console.log('🚀 Database connection successful');
        } catch (err) {
            console.error(`❌ Database connection error: ${err.message}`);
        }
    }
}