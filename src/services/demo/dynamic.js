const poolPromise = require('../../db/conn.js');
const APIResponseFormat = require('../../utils/APIResponseFormat.js');
const sql = require('mssql');
const fs = require('fs');


const createAndExecuteStoredProcedure = async (procedureName, procedureDefinition, parameters, executeParams) => {
    try {
        let pool = await poolPromise; // Wait for the connection pool to be established
        let request = pool.request();
        
        // Drop the procedure if it exists
        await request.query(`IF OBJECT_ID('${procedureName}', 'P') IS NOT NULL
                            DROP PROCEDURE ${procedureName}`);

        // Create the new stored procedure
        await request.query(procedureDefinition);

        // Set input parameters
        for (const param of parameters) {
            request.input(param.name, param.type, executeParams[param.name]);
        }

        // Execute the stored procedure
        const result = await request.execute(procedureName);
        console.log(result);
        return result;
    }
    catch (error) {
        throw error;
    }
}

const demo = async (req, res) => {
    try {
        const procedureName = 'GetDemo';
        const procedureDefinition = `CREATE PROCEDURE ${procedureName}
                                        @total INT OUTPUT
                                    AS
                                    BEGIN
                                        SELECT * FROM milan

                                        SELECT @total = COUNT(*) FROM milan

                                        return @total
                                    END`;
        const parameters = [
            { name: 'total', type: sql.Int() },
        ];
        const executeParams = {};

        const result = await createAndExecuteStoredProcedure(procedureName, procedureDefinition, parameters, executeParams);
        return result;
    }
    catch (error) {
        throw error;
    }
}

const addDemo = async (demo) => {
    try {
        const procedureName = 'AddDemo';
        const procedureDefinition = `CREATE PROCEDURE ${procedureName}
                                        @first_name VARCHAR(50),
                                        @last_name VARCHAR(50),
                                        @total INT OUTPUT
                                    AS
                                    BEGIN
                                        INSERT INTO milan (first_name, last_name)
                                        VALUES (@first_name, @last_name)
                                    
                                        SELECT @total = COUNT(*) FROM milan
                                    END`;
        const parameters = [
            { name: 'first_name', type: sql.VarChar() },
            { name: 'last_name', type: sql.VarChar() },
            { name: 'total', type: sql.Int() },
        ];
        const executeParams = {
            first_name: demo.first_name,
            last_name: demo.last_name,
        };

        const result = await createAndExecuteStoredProcedure(procedureName, procedureDefinition, parameters, executeParams);
        return result;
    } catch (error) {
        throw error;
    }
}

const updateDemo = async (id, demo) => {
    try {
        const procedureName = 'UpdateDemo';
        const procedureDefinition = `CREATE PROCEDURE ${procedureName}
                                        @id INT,
                                        @first_name VARCHAR(50),
                                        @last_name VARCHAR(50),
                                        @total INT OUTPUT
                                    AS
                                    BEGIN
                                        UPDATE milan SET first_name = @first_name, last_name = @last_name WHERE id = @id

                                        SELECT @total = COUNT(*) FROM milan
                                    END`;
        const parameters = [
            { name: 'id', type: sql.Int() },
            { name: 'first_name', type: sql.VarChar() },
            { name: 'last_name', type: sql.VarChar() },
            { name: 'total', type: sql.Int() },
        ];
        const executeParams = {
            id: id,
            first_name: demo.first_name,
            last_name: demo.last_name,
        };

        const result = await createAndExecuteStoredProcedure(procedureName, procedureDefinition, parameters, executeParams);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteDemo = async (id) => {
    try {
        const procedureName = 'DeleteDemo';
        const procedureDefinition = `CREATE PROCEDURE ${procedureName}
                                        @id INT,
                                        @total INT OUTPUT
                                    AS
                                    BEGIN
                                        DELETE FROM milan WHERE id = @id
                                    
                                        SELECT @total = COUNT(*) FROM milan
                                    END`;
        const parameters = [
            { name: 'id', type: sql.Int() },
            { name: 'total', type: sql.Int() },
        ];
        const executeParams = {
            id: id,
        };

        const result = await createAndExecuteStoredProcedure(procedureName, procedureDefinition, parameters, executeParams);
        return result;
    } catch (error) {
        throw error;
    }
}

const getDemoById = async (id) => {
    try {
        const procedureName = 'GetDemoById';
        const procedureDefinition = `CREATE PROCEDURE ${procedureName}
                                        @id INT
                                    AS
                                    BEGIN
                                        SELECT * FROM milan WHERE id = @id
                                    END`;
        const parameters = [
            { name: 'id', type: sql.Int() },
        ];
        const executeParams = {
            id: id,
        };

        const result = await createAndExecuteStoredProcedure(procedureName, procedureDefinition, parameters, executeParams);
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