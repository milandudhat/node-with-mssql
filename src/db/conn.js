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
    port : 1433
};


const conn = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        console.log("Database Connected");
        return pool;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

conn().then((db) => {
    module.exports = db;
}).catch((error) => {
    console.log(error);
});



conn().then((db) => {
    db.query(`SELECT * FROM information_schema.tables`).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}).catch((error) => {
    console.log(error);
});

/* DemoTable - first_name , last_name */ 
// insert into this table write sql.query

// conn().then((db) => {
//     db.query(`INSERT INTO DemoTable (first_name , last_name) VALUES ('Rahul' , 'Kumar')`).then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.log(error);
//     });
// }).catch((error) => {
//     console.log(error);
// });





module.exports = conn;