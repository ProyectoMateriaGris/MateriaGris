
/* FUNCION QUE OBSERVA EL ESTADO DEL USUARIO*/

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {



    var usuario = firebase.auth().currentUser;

    if(usuario != null){
        var user_email = user.email;
        document.getElementById("name_user").innerHTML = "MateriaGris te da la bienvenida : " + user_email;
    }

    } else {    

    }
  });


/* FUNCION LOGIN PARA INGRESO DE USUARIOS EXISTENTES */

function login(){

    var email = document.getElementById("email_login").value; 
    var pass = document.getElementById("pass_login").value;


    firebase.auth().signInWithEmailAndPassword(email, pass)
    // Aqui con el metodo then se utiliza para hacer acciones cuando el ingreso del usuario se realizo correctamente
    .then(function(){

        window.alert("Usted se logueó exitosamente");
        console.log("Usuario logueado");

        document.location.href = "Bienvenido.html";

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

        document.location.href = "Bienvenido.html";

    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no registrado");
        // ...
      });
}



