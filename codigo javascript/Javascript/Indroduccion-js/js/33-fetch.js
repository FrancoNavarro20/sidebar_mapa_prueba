'use strict';

//Fetch
var div_usuarios = document.querySelector("#usuarios");
var div_janet = document.querySelector("#janet");
var div_profesor = document.querySelector("#profesor");

    getUsuarios()
        .then(data => data.json())
        .then(users => {
            listadoUsuarios(users.data);
            return getInfo();
        })
        .then(data => {
            console.log(data);
            document.querySelector("#profesor .objetoProfesor").innerHTML = data;
            mostrarProfesor(data);
            return getJanet();
        })
        .then(data => data.json())
        .then(janet =>{
            mostrarUnUsuario(janet.data); // el .data es que solo le envio el objeto json del usuario, solamente;
        })
        .catch(error =>{
            console.log("El error es : " + error);
        });



function getUsuarios(){
    return fetch('https://reqres.in/api/users');
}

function getJanet(){
    return fetch('https://reqres.in/api/users/2');
}


function getInfo(){
    var profesor = {
        nombre : "Franco",
        apellido: "Navarro",
        url: "https://victorroblesweb.es"
    }

    return new Promise((resolve, reject)=>{
        var profesor_string = "";
        setTimeout(function(){
            profesor_string = JSON.stringify(profesor);

            if(typeof profesor_string != 'string'){return reject("error")};

            return resolve(profesor_string); //aca ya le estoy devolviendo el objeto;

        },3000);

    });
}


function listadoUsuarios(user){

    user.map((user, i) =>{
        let nombre = document.createElement('h3');
        nombre.innerHTML = i + "- " + user.first_name + " " + user.last_name;

        div_usuarios.appendChild(nombre);

        document.querySelector(".loading").style.display = "none";
    });
}

function mostrarUnUsuario(unUsuario){

    let nombre = document.createElement('h3');
    let avatar = document.createElement('img');

    nombre.innerHTML = unUsuario.first_name + " - " + unUsuario.last_name;
    avatar.src = unUsuario.avatar;

    div_janet.appendChild(nombre);
    div_janet.appendChild(avatar);
    //Ocultando el cargando una ves que termina la peticion a la Api
    document.querySelector("#janet .loading").style.display = "none";
}

function mostrarProfesor(profesor){

    var convertir_Objeto = JSON.parse(profesor);
    let nombre_profesor = document.createElement('h3');
    nombre_profesor.innerHTML = convertir_Objeto.nombre + " " + convertir_Objeto.apellido + " => " +convertir_Objeto.url;

    div_profesor.appendChild(nombre_profesor);
    //ocultar cargando...
    document.querySelector("#profesor .loading").style.display = "none";
}