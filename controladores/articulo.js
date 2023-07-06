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
}

const crear = (req, res) => {

    //RECOGER PARÁMETROS POR POST A GUARDAR

    //VALIDAR DATOS

    //CREAR EL OBJETO A GUARDAR

    //ASIGNAR VALORES A OBJETOS BASADO EN EL MODELO (MANUAL O AUTOMÁTICO)

    //GUARDAR EL ARTÍCULO EN LA BASE DE DATOS

    //DEVOLVER RESULTADO

    return res.status(200).json({
        mensaje: "Acción Guardar"
    });
}

module.exports = {
    prueba, curso, crear
}