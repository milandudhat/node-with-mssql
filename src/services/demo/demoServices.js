const poolPromise = require('../../db/conn.js');
const APIResponseFormat = require('../../utils/APIResponseFormat.js');
const sql = require('mssql');
const fs = require('fs');



const demo = async (req, res) => {
    try {
        const pool = await poolPromise; // Wait for the connection pool to be established
        // const result = await pool.request().query('SELECT TABLE_NAME FROM information_schema.tables');
        const result = await pool.request().query('SELECT * FROM milan');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

const addDemo = async (demo) => {
    try {
        // console.log(demo);
        /* first_name and last_name are the columns in the table */
        const pool = await poolPromise; // Wait for the connection pool to be established
        const result = await pool.request()
            .input('first_name', sql.VarChar(), demo.first_name)
            .input('last_name', sql.VarChar(), demo.last_name)
            .query('INSERT INTO milan (first_name, last_name) VALUES (@first_name, @last_name)');
            console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}

const updateDemo = async (id, demo) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established
        let result = await pool.request()
            .input('id', sql.Int(), id)
            .input('first_name', sql.VarChar(), demo.first_name)
            .input('last_name', sql.VarChar(), demo.last_name)
            .query('UPDATE milan SET first_name = @first_name, last_name = @last_name WHERE id = @id');
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteDemo = async (id) => {
    try {
        // let ids = 1;
        const pool = await poolPromise; // Wait for the connection pool to be established
        const result = await pool.request()
            .input('id', sql.Int(), id)
            .query('DELETE FROM milan WHERE id = @id');

        return result;
    } catch (error) {
        throw error;
    }
}

const getDemoById = async (id) => {
    try {
        const pool = await poolPromise; // Wait for the connection pool to be established
        const result = await pool.request()
            .input('id', sql.Int(), id)
            .query('SELECT * FROM milan WHERE id = @id');
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo,
    getDemoById
}