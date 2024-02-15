// Code here is to specifically talk to Mongo.

const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customers: [ String ],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    },
});

// Specifying collection name. Collects launchesSchema with the latest "launches" collection.
module.exports = mongoose.model('Launch', launchesSchema);


// const launch = {
//     flightNumber: 100,
//     mission: 'Kepler Exploration X',
//     rocket: 'Explorer IS1',
//     launchDate: new Date('August 9, 2024'),
//     target: 'Kepler-442 b',
//     customer: ['ZTM','NASA'],
//     upcoming: true,
//     success: true,
// };