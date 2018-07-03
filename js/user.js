
/* FUNCION QUE OBSERVA EL ESTADO DEL USUARIO*/

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    var usuario = firebase.auth().currentUser;

        if(usuario != null){
            var user_email = usuario.email;


            if (document.getElementById("caja_log")) {
                document.getElementById("caja_log").innerHTML = 
                `
                <div class="caja_log2">
                <a href="Perfil_user.html"><p>${user_email}</p></a>
                <button onclick="logout()"><u>Cerrar sesión</u></button>
                </div>
                `
            } else {
                document.getElementById("name_user").innerHTML= user_email 
            }


            

        }
    }
});

function verificador(){
    

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            document.location.href="curso_registradoPHP.html";
        }else{
             document.location.href = "login.html";

        }
    });


}

function verificador2(){
    

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            document.location.href="curso_registrado_desarrollo_frontend.html";
        }else{
             document.location.href = "login.html";

        }
    });


}

  


/* FUNCION LOGIN PARA INGRESO DE USUARIOS EXISTENTES */

function login(){

    var email = document.getElementById("email_login").value; 
    var pass = document.getElementById("pass_login").value;


    firebase.auth().signInWithEmailAndPassword(email, pass)
    // Aqui con el metodo then se utiliza para hacer acciones cuando el ingreso del usuario se realizo correctamente
    .then(function(){

        window.alert("Usted se logueó exitosamente");
        console.log("Usuario logueado");

        document.location.href = "Perfil_user.html";

    })
    // Aqui caso contrario no ya que aca se pone cuando hay un error la ingresar el usuario
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no logueado");
        // ...
    });
}

/* FUNCIÓN REGISTRO PARA REGISTRAR USUARIOS NUEVOS */
function registrar(){

    var email_reg = document.getElementById("email_reg").value; 
    var pass_reg = document.getElementById("pass_reg").value;

    firebase.auth().createUserWithEmailAndPassword(email_reg, pass_reg)
    // Aqui con el metodo then se utiliza para hacer acciones cuando el ingreso del usuario se realizo correctamente
    .then(function(){

        window.alert("Registro exitoso : " + email_reg);
        console.log("Usuario registrado");

        document.location.href = "Perfil_user.html";

    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no registrado");
        // ...
      });
}

/* FUNCIÓN QUE PERMITIRÁ CERRAR SESION A LOS USUARIOS*/

function logout(){
    firebase.auth().signOut();
    document.location.href ="index.html";
}

function logout2(){
    firebase.auth().signOut();
    document.location.href ="../index.html";
}

// FUNCIONES QUE INTERACCIONAN CON LA BASE DE DATOS DE FIREBASE
// MUESTRA LOS DATOS AL ACTUALIZAR LA PAGINA
var contenidoref = firebase.database().ref('Usuarios/');
contenidoref.on('value', function(snapshot) {

  console.log("Se ha actualizado la base de datos");

  var user = firebase.auth().currentUser;
  
  if(user != null){
          var userId = firebase.auth().currentUser.uid;
          firebase.database().ref('/Usuarios/' + userId).once('value').then(function(snapshot) {
            if (document.getElementById("camp1")) {
            if (snapshot.val()) {
                var nombre = snapshot.val().Nombre;
                var app = snapshot.val().Apellidos;
                var edad = snapshot.val().Edad;
                var gen = snapshot.val().Genero;
                var pais = snapshot.val().Pais;
                //Mostrando datos en los campos
                document.getElementById("camp1").innerHTML = nombre;
                document.getElementById("camp2").innerHTML = app;
                document.getElementById("camp3").innerHTML = edad;
                document.getElementById("camp4").innerHTML = gen;
                document.getElementById("camp5").innerHTML = pais;
            } else {

                    document.getElementById("camp1").innerHTML = "";
                    document.getElementById("camp2").innerHTML = "";
                    document.getElementById("camp3").innerHTML = "";
                    document.getElementById("camp4").innerHTML = "";
                    document.getElementById("camp5").innerHTML = "";
                } 
            }
            if (document.getElementById("botones")) {
                document.getElementById("botones").innerHTML = 
                `
                <button onclick="editar()">Editar</button>
                `
            }
          });
  }else{
      console.log("falta de logueo")
  }

});


function escribir(){
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var user_name = document.getElementById("user_nom").value;
    var user_app = document.getElementById("app").value;
    var user_edad = document.getElementById("edad").value;
    var user_pais = document.getElementById("pais").value;

    if (document.getElementById("hombre").checked) {
    var user_gen = document.getElementById("hombre").value;
    } else {
    var user_gen = document.getElementById("mujer").value;
    }
    
    firebase.database().ref('Usuarios/' + userId).set({
        Nombre:user_name,
        Apellidos:user_app,
        Edad:user_edad,
        Genero:user_gen,
        Pais:user_pais,
    });
}

function editar(){
  var user = firebase.auth().currentUser;
  
  if(user != null){
    // Linea de prueba
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/Usuarios/' + userId).once('value').then(function(snapshot) {
        if (snapshot.val()) {
            var nombre = snapshot.val().Nombre;
            var app = snapshot.val().Apellidos;
            var edad = snapshot.val().Edad;
            var gen = snapshot.val().Genero;
            var pais = snapshot.val().Pais;
            //Mostrando datos en los campos
            document.getElementById("camp1").innerHTML =
            `
            <input type="text" id="user_nom" value="${nombre}">
            `
            document.getElementById("camp2").innerHTML =
            `
            <input type="text" id="app" value="${app}">
            `
            document.getElementById("camp3").innerHTML =
            `
            <input type="text" id="edad" value="${edad}">
            `
            document.getElementById("camp4").innerHTML =
            `
            <input type="radio" name="sexo" id="hombre" value="Hombre">
            <label for="hombre">Masculino</label>
            <input type="radio" name="sexo" id="mujer" value="Mujer">
            <label for="mujer">Femenino</label>
            `
            document.getElementById("camp5").innerHTML =
            `
            <input type="text" id="pais" value="${pais}">
            `
            document.getElementById("botones").innerHTML =
            `
            <button onclick="escribir()">Guardar cambios</button>
            `
        } else {
            document.getElementById("camp1").innerHTML =
            `
            <input type="text" id="user_nom" >
            `
            document.getElementById("camp2").innerHTML =
            `
            <input type="text" id="app" >
            `
            document.getElementById("camp3").innerHTML =
            `
            <input type="text" id="edad" >
            `
            document.getElementById("camp4").innerHTML =
            `
            <input type="radio" name="sexo" id="hombre" value="Hombre">
            <label for="hombre">Masculino</label>
            <input type="radio" name="sexo" id="mujer" value="Mujer">
            <label for="mujer">Femenino</label>
            `
            document.getElementById("camp5").innerHTML =
            `
            <input type="text" id="pais">
            `
            document.getElementById("botones").innerHTML =
            `
            <button onclick="escribir()">Guardar cambios</button>
            `
        }
    // ...
    });
    }else{
        console.log("falta de logueo")
    }

}