const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) throw new Error('No se pudo grabar', err);

    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {

    //Antes de hacer push se debe cargar la base de datos
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

let getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    /* Para saber la tarea que coincida con la descripcion vamos a usar la funcion findIndex de los arreglos. Esta funcion recibe un callback y 
     *  va hacer un ciclo interno por cada uno de los elementos y podemos obtener cada uno de esos elementos con una palabra clave
     * en este caso "tarea". Lo que le estoy diciendo a JS es que me de el index o la posicion de esta tarea, si la descripcion de la tarea 
     * coincide, si no coincide retorna un -1 esto indica que no lo encontro. 
     */

    let index = listadoPorHacer.findIndex(Tarea => {
        return Tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

    /*Esto es equivalente a lo anterior. De las dos formas podemos escribirlo
    let index = listadoPorHacer.findIndex(Tarea => Tarea.descripcion === descripcion);*/
}

let borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}