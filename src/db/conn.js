const sql = require('mssql');

const sqlConfig = {
    user: 'cccadm',
    password: 'ccc@123',
    server: '192.168.0.205',
    database: 'eMarNode',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instancename: '',
        encrypt: false
    },
    port: 1433,
    connectionTimeout: 300000, // Maximum time to establish a connection
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        idleTimeoutMillis: 30000 // Time a connection can be idle in the pool before being closed
    },
    requestTimeout: 300000, // Maximum time for a database request to complete
    stream: false, // Whether to enable streaming of records
};

// Connect to the SQL Server using the provided configuration
const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log("Database Connected");
        return pool;
    })
    .catch(error => {
        console.log(error);
        throw error;
    });

// Export the connection pool so it can be used in other files
module.exports = poolPromise;
