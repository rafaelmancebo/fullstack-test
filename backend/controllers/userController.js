const prisma = require('../models/prismaClient');
const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: { Address: true },
    });
    res.json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    if (id === undefined) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
                include: { Address: true },
            });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving user' });
        }
    }
};

const createUser = async (req, res) => {
    const { name, email } = req.body;
    if (email === undefined || name === undefined) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    } else {
        if (!emailRegexp.test(email)) {
            res.status(400).json({ error: 'Invalid email' });
            return;
        } else {
            try {
                const user = await prisma.user.create({
                    data: {
                        name,
                        email,
                    },
                });
                res.status(201).json(user);
            } catch (error) {
                res.status(500).json({ error: 'Error creating user' });
            }
        }
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (email === undefined || name === undefined) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    } else {
        if (!emailRegexp.test(email)) {
            res.status(400).json({ error: 'Invalid email' });
            return;
        } else {
            try {
                const user = await prisma.user.update({
                    where: { id: parseInt(id) },
                    data: { name, email },
                });
                res.json(user);
            } catch (error) {
                res.status(404).json({ error: 'User not found' });
            }
        }
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (id === undefined) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    } else {
        try {
            await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(404).json({ error: 'User not found' });
        }
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };
