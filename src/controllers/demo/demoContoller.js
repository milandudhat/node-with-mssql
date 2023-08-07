const APIResponseFormat = require('../../utils/APIResponseFormat.js');
const DemoService = require('../../services/demo/demoServices.js');
const db = require('../../db/conn.js');


const demo = async (req, res) => {
    try {
        const demo = await DemoService.demo();
        return demo
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const addDemo = async (req, res) => {
    try {
        console.log(req.body);
        const newDemo = await DemoService.addDemo(req.body);
        return newDemo
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const updateDemo = async (req, res) => {
    try {
        const updatedDemo = await DemoService.updateDemo(req.params.id, req.body);
        return updatedDemo
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

const deleteDemo = async (req, res) => {
    try {
        const deletedDemo = await DemoService.deleteDemo(req.params.id);
        return deletedDemo
    } catch (error) {
        return APIResponseFormat._ResServerError(res, error);
    }
}

module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo
}