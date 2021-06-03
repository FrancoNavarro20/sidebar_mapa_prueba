'use strict'

//JSON - Javascrit Object Notation

var pelicula ={
    titulo: "Spiderman",
    year: 2002,
    pais:"Estados Unidos"
};

var peliculas =[
    {titulo:"La verdad duele", year:2016, pais:"Francia"},
    pelicula
];

pelicula.titulo = "El sorprendente hombre araña";

console.log(pelicula);

//Recorrer y mostrar listado de peliculas;
var caja_Peliculas = document.querySelector("#peliculas");
var index;
for(index in peliculas){

    var parrafo = document.createElement('p');
    parrafo.append(peliculas[index].titulo + " - " + peliculas[index].year);
    caja_Peliculas.append(parrafo);

}


