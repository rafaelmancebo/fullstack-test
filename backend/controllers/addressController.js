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
    const { address, province } = req.body;
    const addressData = await prisma.address.create({
        data: {
            address,
            province,
            userId: parseInt(userId),
        },
    });
    res.status(201).json(addressData);
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { address, province } = req.body;
    const addressData = await prisma.address.update({
        where: { id: parseInt(id) },
        data: {
            address,
            province,
        },
    });
    res.json(addressData);
};

const deleteAddress = async (req, res) => {
    const { id } = req.params;
    await prisma.address.delete({
        where: { id: parseInt(id) },
    });
    res.status(204).send();
};

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress };
