// Keeping router and controller in same folder. Planet router will have direct use of this controller file.

const { getAllPlanets } = require('../../models/planets.model')

async function httpGetAllPlanets(req,res) {
    return res.status(200).json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets,
}