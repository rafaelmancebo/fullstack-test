const prisma = require('../models/prismaClient');

const getAddresses = async (req, res) => {
    const { userId } = req.params;
    const addresses = await prisma.address.findMany({
        where: { userId: parseInt(userId) },
    });
    res.json(addresses);
};

const createAddress = async (req, res) => {
    const { userId } = req.params;
    const { street, city, state } = req.body;
    const address = await prisma.address.create({
        data: {
            street,
            city,
            state,
            userId: parseInt(userId),
        },
    });
    res.status(201).json(address);
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, city, state } = req.body;
    const address = await prisma.address.update({
        where: { id: parseInt(id) },
        data: {
            street,
            city,
            state,
        },
    });
    res.json(address);
};

const deleteAddress = async (req, res) => {
    const { id } = req.params;
    await prisma.address.delete({
        where: { id: parseInt(id) },
    });
    res.status(204).send();
};

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress };
