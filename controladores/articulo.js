const validator = require("validator");
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
        let validar_titulo = !validator.isEmpty(parametros.titulo) &&
            validator.isLength(parametros.titulo, { min: 2, max: undefined });

        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            console.log("Entró a MongooseERROR");
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

//LA NUEVA FORMA EN MONGODB 6.0.7 en vez de usar callbacks se usa PROMESAS .then o .catch
// Para solucionar este problema, puedes reemplazar el uso de callbacks por promesas o funciones async/await en tus llamadas a save() y find(). Por ejemplo, en lugar de hacer lo siguiente:

// miModelo.save(function (err, resultado) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(resultado);
//   }
// });
// Puedes hacer lo siguiente, utilizando promesas:

// miModelo.save()
//   .then(function (resultado) => {
//     console.log(resultado);
//   })
//   .catch(function (err) => {
//     console.error(err);
//   });
// O utilizando async/await:

// try {
//   const resultado = await miModelo.save();
//   console.log(resultado);
// } catch (err) {
//   console.error(err);
// }


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


module.exports = {
    prueba, curso, crear, listar, uno
}