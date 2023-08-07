const conn = require('../../db/conn.js');



const demo = async (req, res) => {
    try {
        const demo = await Demo.findAll();
        return demo
    } catch (error) {
        throw error;
    }
}

const addDemo = async (demo) => {
    try {
        /* DemoTable - first_name , last_name */
        /*
        {
            "first_name" : "Rahul",
            "last_name" : "Kumar"
        }

        */
       console.log(demo);
    //    conn().then((db) => {
    //     db.query(`INSERT INTO DemoTable (first_name , last_name) VALUES ('${demo.first_name}' , '${demo.last_name}')`).then((result) => {
    //         console.log(result);
    //         return result;
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }).catch((error) => {
    //     console.log(error);
    // });

    } catch (error) {
        throw error;
    }
}

const updateDemo = async (id, demo) => {
    try {
        const updatedDemo = await Demo.update(demo, {
            where: {
                id: id
            }
        });
        return updatedDemo
    } catch (error) {
        throw error;
    }
}

const deleteDemo = async (id) => {
    try {
        const deletedDemo = await Demo.destroy({
            where: {
                id: id
            }
        });
        return deletedDemo
    } catch (error) {
        throw error;
    }
}

module.exports = {
    demo,
    addDemo,
    updateDemo,
    deleteDemo
}