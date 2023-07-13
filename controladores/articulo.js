const fs = require("fs");
const {validarArticulo} = require("../helpers/validar");
const Articulo = require("../modelos/Articulo");

const prueba = (req, res) => {
    console.log("Se ha ejecutado el endpoint ruta-de-prueba");
    return res.status(200).json({
        mensaje: "Soy una acción de prueba en mi controlador de artículos"
    });
}

const curso = (req, res) => {
    console.log("Se ha ejecutado el endpoint CURSO");

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
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //CREAR EL OBJETO A GUARDAR
    const articulo = new Articulo(parametros);

    //GUARDAR EL ARTÍCULO EN LA BASE DE DATOS
    console.log("Justo antes de guardar");
    articulo.save().then((articuloGuardado) => {
        if (!articuloGuardado) {
            console.log("Entró a la verificación");
            console.log("Guardado: " + articuloGuardado);
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el artículo"
            });
        }

        //DEVOLVER RESULTADO
        console.log("Justo antes de devolver resultado");
        return res.status(200).json({
            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo creado con éxito"
        })
    });
    console.log("DESPUÉS de guardar");
}

//CONSEGUIR ARTICULOS TRAERLOS DESDE MONGODB
const listar = (req, res) => {
    // EL MÉTODO THEN es el que ejecuta la consulta
    let consulta = Articulo.find({})
    
    //Condicional para validar si es un número o no
    if(isNaN(req.params.ultimos) == false ){
        //limit("NUMBER") //Devuelve solo "N" resultados
        consulta.limit(req.params.ultimos);
    }

    //FILTROS PARA DEVOLVER VALORES DE LA DB
        consulta.sort({fecha: -1}) //Ordena los resultados de más reciente a más antiguo
        consulta.then((articulos) => {
            console.log("Ha entrado a consulta de artículos exitosa");
        return res.status(200).send({
            status: "success",
            parametro: req.params.ultimos,
            cantidad: articulos.length,
            articulos
        })
    }).catch((error) => {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado artículos"
        });
    });
}

//ENCONTRAR UN ARTÍCULO POR SU ID
const uno = (req, res) => {
    //Recoger un id por la URL
    id = req.params.id;

    //Buscar el artículo
    Articulo.findById(id)
        .then((articulo) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                articulo
            })
        })
        .catch((error) => {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });
        })
};

const borrar = (req, res) => {

    let articulo_id = req.params.id;
    Articulo.findOneAndDelete({_id: articulo_id})
        .then((articuloBorrado) => {
            //Devolver borrado exitosamente
            return res.status(200).json({
                status: "Success",
                articulo: articuloBorrado,
                mensaje: "Método borrar ejecutado exitosamente"
            });
        })
        .catch((error) => {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al borrar el artículo"
            });
        })

};

const editar = (req, res) => {

    let articulo_id = req.params.id;

    //RECOGER PARÁMETROS DE TÍTULO Y CONTENIDO POR POST A GUARDAR
    let parametros = req.body;

    //VALIDAR DATOS
    try{
        validarArticulo(parametros);
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //Buscar y Actualizar artículo por ID
    Articulo.findOneAndUpdate({_id: articulo_id}, req.body, {new: true})
        .then ((articuloActualizado) => {
            return res.status(200).json ({
                status: "Success",
                articulo: articuloActualizado,
                mensaje: "Articulo actualizado con éxito"
            })
        })
        .catch ((error) => {
            return res.status(500).json({
                status: "Error",
                mensaje: "Error al actualizar"
            })
        });
}


const subir = (req, res) => {

    //Recoger el fichero de imagen subido
    if (!req.file || !req.files){
        return res.status(404).json({
            status: "error",
            mensaje: "Petición inválida"
        });
    }

    //Nombre del archivo
    let archivo = req.file.originalname;

    //Extensión del archivo
    let archivo_split = archivo.split("\.");
    let archivo_extension = archivo_split[1];

    //Comprobar extensión correcta
    if(archivo_extension != "png" && archivo_extension != "jpg" &&
    archivo_extension != "jpeg" && archivo_extension != "gif" && archivo_extension != "JPG"){

            //Borrar archivo y dar respuesta
            fs.unlink(req.file.path, (error) => {
                return res.status(400).json({
                    status: "error",
                    mensaje: "Imagen inválida"
                });
            })
        } else {
            //Devolver respuesta
        return res.status(200).json({
            status: "Success",
            archivo_split,
            archivo_extension,
            files: req.file
        })
    }

    //Si todo va bien, actualizar el artículo

}

module.exports = {
    prueba, curso, crear, listar, uno, borrar, editar, subir
}