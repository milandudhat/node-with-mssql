const APIResponseFormat = require('../../utils/APIResponseFormat.js');
// const DemoService = require('../../services/demo/demoServices.js');
const db = require('../../db/conn.js');
// const DemoService = require('../../services/demo/sp.js');
const DemoService = require('../../services/demo/dynamic.js');



const demo = async (req, res) => {
    try {
        const demo = await DemoService.demo();
        return APIResponseFormat._ResDataFound(res, demo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const addDemo = async (req, res) => {
    try {
        // console.log(req.body);
        const newDemo = await DemoService.addDemo(req.body);
        if(newDemo.rowsAffected[0] === 0) return APIResponseFormat._ResDataNotCreated(res);
        return APIResponseFormat._ResDataCreated(res, newDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const updateDemo = async (req, res) => {
    try {
        let id = req.headers.id;
        const updatedDemo = await DemoService.updateDemo(id, req.body);
        if(updatedDemo.rowsAffected[0] === 0) return APIResponseFormat._ResDataNotUpdated(res);
        return APIResponseFormat._ResDataUpdated(res, updatedDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const deleteDemo = async (req, res) => {
    try {
        const id = req.headers.id;
        const deletedDemo = await DemoService.deleteDemo(id);
        if(deletedDemo.rowsAffected[0] === 0) return APIResponseFormat._ResDataNotDeleted(res);
        return APIResponseFormat._ResDataDeleted(res, deletedDemo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const getDemoById = async (req, res) => {
    try {
        const id = req.headers.id;
        const demo = await DemoService.getDemoById(id);
        return APIResponseFormat._ResDataFound(res, demo);
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo,
    getDemoById
}