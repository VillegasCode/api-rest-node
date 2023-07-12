const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

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


module.exports = router;