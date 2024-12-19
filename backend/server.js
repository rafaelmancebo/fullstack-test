const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const addressRoutes = require('./routes/addresses');
const prisma = require('./models/prismaClient');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);

const startServer = async () => {
    try {
        // Start server
        const PORT = 3001;
        await prisma.$connect();
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};

startServer();
