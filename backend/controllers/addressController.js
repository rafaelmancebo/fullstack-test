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

    if (!address || !province) {
        return res.status(400).json({ error: 'Address and province are required' });
    }

    try {
        const addressData = await prisma.address.create({
            data: {
                address,
                province,
                userId: parseInt(userId),
            },
        });
        res.status(201).json(addressData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the address' });
    }
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { address, province } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Address ID is required' });
    }

    if (!address || !province) {
        return res.status(400).json({ error: 'Address and province are required' });
    }

    try {
        const addressData = await prisma.address.update({
            where: { id: parseInt(id) },
            data: {
                address,
                province,
            },
        });
        res.json(addressData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the address' });
    }
};

const deleteAddress = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Address ID is required' });
    }

    try {
        await prisma.address.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the address' });
    }
};

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress };
