const mongoose = require('mongoose');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

// mongoose.set('useFindAndModify', false);

async function init() {
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            createAccessory,
            edit
        };

        next();
    }
}

async function getAll(query) {
    const options = {};

    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' };
    }
    if (query.from) {
        options.difficulty = { $gte: Number(query.from) };
    }
    if (query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);
    }

    let cubes = await Cube
        .find(options)
        .populate('accessories')
        .lean();
    return cubes;
}

async function getById(id) {
    const cube = await Cube.findById(id).lean();

    if (cube) {
        return cube;
    } else {
        return undefined;
    }
}

async function create(cube) {
    const record = new Cube(cube)
    return record.save();
}

async function createAccessory(accessory) {
    await new Accessory({
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
    }).save();
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(existing, cube); // goes through the setters (validation)
    return existing.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
};