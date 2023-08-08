const poolPromise = require('../../db/conn.js');
const APIResponseFormat = require('../../utils/APIResponseFormat.js');
const sql = require('mssql');
const fs = require('fs');



const demo = async (req, res) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established

        // create stored procedure if exist then drop it and create new one
        let request = pool.request();
        await request.query(`IF OBJECT_ID('GetDemo', 'P') IS NOT NULL
                            DROP PROCEDURE GetDemo`);

        // Create the new stored procedure
        await request.query(`CREATE PROCEDURE GetDemo
                            AS
                            BEGIN
                                SELECT * FROM milan
                            END`);

        // Now that the stored procedure is created, you can use it
        const result = await request.execute('GetDemo');
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }

}

const addDemo = async (demo) => {
    try {
        const pool = await poolPromise; // Wait for the connection pool to be established
        const request = pool.request();
        await request.query(`IF OBJECT_ID('AddDemo', 'P') IS NOT NULL
                        DROP PROCEDURE AddDemo`);

        // Create the new stored procedure
        await request.query(`
        CREATE PROCEDURE AddDemo
            @first_name VARCHAR(50),
            @last_name VARCHAR(50),
            @total INT OUTPUT
        AS
        BEGIN
            INSERT INTO milan (first_name, last_name)
            VALUES (@first_name, @last_name)

            
            SELECT @total = COUNT(*) FROM milan
        END
    `);

        // Now that the stored procedure is created, you can use it
        request.input('first_name', sql.VarChar(), demo.first_name);
        request.input('last_name', sql.VarChar(), demo.last_name);
        request.output('total', sql.Int() );

        // Execute the stored procedure
        const result = await request.execute('AddDemo');
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}

const updateDemo = async (id, demo) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established
        let request = pool.request();
        await request.query(`IF OBJECT_ID('UpdateDemo', 'P') IS NOT NULL
                            DROP PROCEDURE UpdateDemo`);

        // Create the new stored procedure
        await request.query(`
        CREATE PROCEDURE UpdateDemo
            @id INT,
            @first_name VARCHAR(50),
            @last_name VARCHAR(50)
        AS
        BEGIN
            UPDATE milan SET first_name = @first_name, last_name = @last_name WHERE id = @id
        END
    `);

        // Now that the stored procedure is created, you can use it
        request.input('id', sql.Int(), id);
        request.input('first_name', sql.VarChar(), demo.first_name);
        request.input('last_name', sql.VarChar(), demo.last_name);

        // Execute the stored procedure
        const result = await request.execute('UpdateDemo');
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}

const deleteDemo = async (id) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established
        let request = pool.request();
        await request.query(`IF OBJECT_ID('DeleteDemo', 'P') IS NOT NULL
                            DROP PROCEDURE DeleteDemo`);

        // Create the new stored procedure
        await request.query(`
        CREATE PROCEDURE DeleteDemo
            @id INT
        AS
        BEGIN
            DELETE FROM milan WHERE id = @id
        END
    `);

        // Now that the stored procedure is created, you can use it
        request.input('id', sql.Int(), id);

        // Execute the stored procedure
        const result = await request.execute('DeleteDemo');
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}

const getDemoById = async (id) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established
        let request = pool.request();
        await request.query(`IF OBJECT_ID('GetDemoById', 'P') IS NOT NULL
                            DROP PROCEDURE GetDemoById`);

        // Create the new stored procedure
        await request.query(`
        CREATE PROCEDURE GetDemoById
            @id INT
        AS
        BEGIN
            SELECT first_name FROM milan WHERE id = @id
        END
    `);

        // Now that the stored procedure is created, you can use it
        request.input('id', sql.Int(), id);

        // Execute the stored procedure
        const result = await request.execute('GetDemoById');
        console.log(result);
        return result.recordsets[0];
    }
    catch (error) {
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