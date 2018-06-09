
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

        window.alert("Usted se logeo exitosamente");
        console.log("Usuario logeado");

        document.location.href = "Bienvenido.html";

    })
    // Aqui caso contrario no ya que aca se pone cuando hay un error la ingresar el usuario
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Usuario no registrado");
        // ...
    });
}



