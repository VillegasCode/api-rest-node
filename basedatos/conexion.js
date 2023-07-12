const mongoose = require("mongoose");
const puerto = 27017;

const conexion = async() => {

    try {

        await mongoose.connect("mongodb://127.0.0.1:" + puerto + "/mi_blog");

        //SOLO EN CASO DE AVISOS COLOCAR COMO PARÁMETROS A LA CONEXIÓN LO SIGUIENTE:
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        console.log("Conectado correctamente a la base de datos mi_blog en puerto: " + puerto);

    } catch(error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos!!");
    }
}

module.exports = {
    conexion
}