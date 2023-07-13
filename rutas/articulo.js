const express = require("express");
const multer = require("multer");
const router = express.Router();
const ArticuloControlador = require("../controladores/articulo");


const almacenamiento = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './imagenes/articulos/');
    },

    filename: function(req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
})

const subidas = multer({storage: almacenamiento});

//Rutas de pruebas
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);

//RUTA ÚTIL
router.post("/crear", ArticuloControlador.crear);

//RUTA LISTAR ARTÍCULOS
//Los parámetros opcionales inician con ":" y llevan un signo de cierre de interrogación al final
router.get("/articulos/:ultimos?", ArticuloControlador.listar);

//Los parámetros obligatorios no llevan ningún signo al final solo inician con ":"
router.get("/articulo/:id", ArticuloControlador.uno)

//Borrar/Eliminar un artículo de la BD
router.delete("/articulo/:id", ArticuloControlador.borrar);

//Editar/Cambiar/Actualizar un artículo de la BD
router.put("/articulo/:id", ArticuloControlador.editar);

//SUBIR IMAGEN con MIDLEWARE entre corchetes
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir);

module.exports = router;