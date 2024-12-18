const prisma = require('../models/prismaClient');

const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: { Address: true },
    });
    res.json(users);
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });
    res.status(201).json(user);
};

module.exports = { getUsers, createUser };
