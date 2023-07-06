const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors")

//Inicializar app
console.log("App de NODE arrancada");

//Conectar a la Base de Datos
conexion();

//Crear Servidor Node
const app = express();
const puerto = 3900;

//Configurar Cors como Middleware para que se ejecute antes de la ruta
app.use(cors());

//Convertir body a objeto js
app.use(express.json());

//RUTAS
const rutas_articulo = require("./rutas/articulo");

//CARGO LAS RUTAS
app.use("/api", rutas_articulo);


//RUTAS HARDCODEADAS
app.get("/probando", (req, res) => {

    console.log("Se ha ejecutado el endpoint probando");

    //RETORNANDO RESPUESTAS JSON DINÁMICAS - Forma USUAL
    return res.status(200).json([{
        curso: "Master en React",
        autor: "Alex Villegas",
        url: "empresarioencasa.org/servicios"
    },
    {
        curso: "Master en Angular",
        autor: "Erick Chirinos",
        url: "erickch.com"
    },
]);

app.get("/", (req, res) => {
    return res.status(200).send(
       "<h1>Empezando a crear un api rest con node</h1>"
    );
})
    
    //RETORNANDO RESPUESTAS ESTÁTICAS (FORMA POCO USUAL)
    // return res.status(200).send(`
    //         <div>
    //             <h1>Probando ruta nodejs</h1>
    //             <p>Creando api rest con node</p>
    //             <ul>
    //                 <li>Master en React</li>
    //                 <li>Master en PHP</li>
    //             </ul>
    //         </div>
    // `);
});

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});