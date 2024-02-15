const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

// const launch = {
//     flightNumber: 100,
//     mission: 'Kepler Exploration X',
//     rocket: 'Explorer IS1',
//     launchDate: new Date('August 9, 2024'),
//     target: 'Kepler-442 b',
//     customers: ['ZTM','NASA'],
//     upcoming: true,
//     success: true,
// };

// saveLaunch(launch);

// launches.set(launch.flightNumber,launch);


// Selects top-most because it will sort in descending order and pick the first one.
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

        if (!latestLaunch) {
            return DEFAULT_FLIGHT_NUMBER;
        }
    
        return latestLaunch.flightNumber;
}

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    });
}

async function getAllLaunches() {
    return await launchesDatabase
    .find({}, { '_id': 0, '_v': 0});
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.findOneAndUpdate( {
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {

    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;


    // return await launchesDatabase.updateOne({
    //     flightNumber: launchId,
    // }, {
    //     upcoming: false,
    //     success: false,
    // });

}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}