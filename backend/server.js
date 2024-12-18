const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/addresses');
const prisma = require('./models/prismaClient');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);

const startServer = async () => {
    try {
        await prisma.$connect();
        app.listen(3001, () => console.log('Server running on http://localhost:3001'));
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};

startServer();
