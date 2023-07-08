const validator = require("validator");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    });
}

const curso = (req, res) => {
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
};

const crear = (req, res) => {

    //RECOGER PARÁMETROS POR POST A GUARDAR
    let parametros = req.body;

    //VALIDAR DATOS
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 5, max: undefined });

        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información!!");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //CREAR EL OBJETO A GUARDAR
    const articulo = new Articulo(parametros);

    //ASIGNAR VALORES A OBJETOS BASADO EN EL MODELO (MANUAL O AUTOMÁTICO)
    //ESTO SE USA PARA GUARDAR UN PARÁMETRO MANUALMENTE
    //articulo.titulo = parametros.titulo;

    //GUARDAR EL ARTÍCULO EN LA BASE DE DATOS
    articulo.save((error, articuloGuardado) => {

        if (error || !articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }

        //DEVOLVER RESULTADO
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con éxito"
        })
    });

}

module.exports = {
    prueba, curso, crear
}